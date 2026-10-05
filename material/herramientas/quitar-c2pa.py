# Quita el manifiesto C2PA ("Content Credentials") que el canal de entrega de Claude
# agrega a cada imagen que escribe en la Mac. Son fotos reales: ese manifiesto, firmado
# por Anthropic, dice que Claude "pudo haber creado o modificado el archivo" y algunos
# navegadores y plataformas lo muestran como etiqueta. Correr después de cada entrega:
#   python3 material/herramientas/quitar-c2pa.py sitio
import os, sys, struct

def jpeg(d):
    out=bytearray(d[:2]); i=2; quitado=False
    while i+4<=len(d) and d[i]==0xFF:
        m=d[i+1]
        if m==0xD8 or 0xD0<=m<=0xD7: out+=d[i:i+2]; i+=2; continue
        if m==0xDA: break
        L=struct.unpack('>H',d[i+2:i+4])[0]
        seg=d[i:i+2+L]
        if m==0xEB and seg[4:6]==b'JP': quitado=True
        else: out+=seg
        i+=2+L
    out+=d[i:]
    return bytes(out), quitado

def png(d):
    out=bytearray(d[:8]); i=8; quitado=False
    while i+8<=len(d):
        L=struct.unpack('>I',d[i:i+4])[0]; t=d[i+4:i+8]; ch=d[i:i+12+L]
        if t==b'caBX': quitado=True
        else: out+=ch
        i+=12+L
    return bytes(out), quitado

def webp(d):
    if d[:4]!=b'RIFF' or d[8:12]!=b'WEBP': return d, False
    out=bytearray(d[:12]); i=12; quitado=False
    while i+8<=len(d):
        t=d[i:i+4]; L=struct.unpack('<I',d[i+4:i+8])[0]; ch=d[i:i+8+L+(L&1)]
        if t==b'C2PA': quitado=True
        else: out+=ch
        i+=8+L+(L&1)
    struct.pack_into('<I',out,4,len(out)-8)
    return bytes(out), quitado

raiz=sys.argv[1] if len(sys.argv)>1 else 'sitio'
n=0
for base,_,fs in os.walk(raiz):
    for f in fs:
        p=os.path.join(base,f); e=f.lower().rsplit('.',1)[-1]
        fn={'jpg':jpeg,'jpeg':jpeg,'png':png,'webp':webp}.get(e)
        if not fn: continue
        d=open(p,'rb').read(); nuevo,q=fn(d)
        if q:
            open(p,'wb').write(nuevo); n+=1; print('limpio', p, len(d),'->',len(nuevo))
print('archivos limpiados:', n)
