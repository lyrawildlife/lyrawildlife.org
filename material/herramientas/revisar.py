# Uso: python3 material/herramientas/revisar.py   (requiere: pip install playwright && playwright install chromium)
# Revisión de armonía: alineación de textos con la columna, desbordes, y textos visibles para leer.
import asyncio, json, sys
from playwright.async_api import async_playwright
import os
base='file://'+os.path.abspath(os.path.join(os.path.dirname(__file__),'..','..','sitio'))+'/'
PAGES=['index.html','orca-explorer/index.html','mirada-natural/index.html','mirada-natural/gracias/index.html']
JS="""
() => {
  const col = document.querySelector('.wrap').getBoundingClientRect();
  const colLeft = col.left + 24; // padding de la columna
  const out = [];
  document.querySelectorAll('main h1, main h2, main h3, main p, main dl, main ul, .colecciones .cabecera h2, .colecciones .cabecera p').forEach(el => {
    if (!el.offsetParent) return;                      // oculto (otro idioma)
    if (el.closest('.cover, .tarjeta, .banda, .figure')) return;  // bloques a sangre con su propia alineación
    const r = el.getBoundingClientRect();
    if (r.width === 0) return;
    const ta = getComputedStyle(el).textAlign;
    if (ta === 'center') return;
    const d = Math.round(r.left - colLeft);
    if (Math.abs(d) > 1 && !el.closest('.item > div') && !el.closest('.esencial') && !el.closest('.impulsor')) out.push({tag: el.tagName, cls: el.className, text: (el.textContent||'').trim().slice(0,50), left: Math.round(r.left), esperado: Math.round(colLeft), dif: d});
  });
  return {colLeft: Math.round(colLeft), scrollW: document.documentElement.scrollWidth, problemas: out};
}
"""
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(); ok=True
        for w in (1280,2560,390):
            for page in PAGES:
                ctx=await b.new_context(locale='es-AR',viewport={'width':w,'height':900}); pg=await ctx.new_page()
                errs=[]; pg.on('pageerror', lambda e: errs.append(str(e)))
                await pg.goto(base+page); await pg.wait_for_timeout(300)
                r=await pg.evaluate(JS)
                flag = r['problemas'] or r['scrollW']>w or errs
                if flag: ok=False
                print(f"{w:5d} {page:32s} columna@{r['colLeft']:4d} scroll={r['scrollW']} {'OK' if not flag else 'REVISAR'}")
                for pr in r['problemas']: print('      ',pr)
                for e in errs: print('       JS:',e)
                await ctx.close()
        await b.close()
    print('\nRESULTADO:', 'todo alineado' if ok else 'hay problemas')
asyncio.run(main())
