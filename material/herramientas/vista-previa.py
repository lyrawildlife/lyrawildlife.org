# Vista previa local de lyrawildlife.org
#
# Copia sitio/ a vista-previa/ y ajusta los enlaces a carpetas ("mirada-natural/",
# "../", "colecciones/") para que apunten a su index.html. Así el sitio se recorre
# entero abriendo vista-previa/index.html con doble clic, sin servidor y sin publicar.
# La carpeta vista-previa/ no se sube a GitHub (está en .gitignore).
#
# Uso, desde la carpeta lyrawildlife.org:
#   python3 material/herramientas/vista-previa.py
import os, re, shutil, sys

raiz = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
origen = os.path.join(raiz, 'sitio')
destino = os.path.join(raiz, 'vista-previa')

try:
    shutil.rmtree(destino)
except FileNotFoundError:
    pass
except OSError:
    pass  # sin permiso para borrar: se sobrescribe encima
shutil.copytree(origen, destino, dirs_exist_ok=True)

# href="algo/" o href="algo/#seccion" (relativo) -> href="algo/index.html" / "algo/index.html#seccion"
patron = re.compile(r'href="((?![a-z]+:)(?!#)[^"#]*/)(#[^"]*)?"')

def ajustar(m):
    ruta, ancla = m.group(1), m.group(2) or ''
    return f'href="{ruta}index.html{ancla}"'

n = 0
for base, _, archivos in os.walk(destino):
    for f in archivos:
        if not f.endswith('.html'):
            continue
        p = os.path.join(base, f)
        s = open(p, encoding='utf-8').read()
        s2 = patron.sub(ajustar, s)
        if s2 != s:
            open(p, 'w', encoding='utf-8').write(s2)
            n += 1

print(f'Vista previa lista ({n} páginas ajustadas). Abrí: {os.path.join(destino, "index.html")}')
