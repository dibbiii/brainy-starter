/* Variant A — the app that routes between pages */

function VariantA({ tokens, heroVariant, fontPair }) {
  const [current, setCurrent] = React.useState('home');
  const T = tokens;
  const css = useACSS(T);

  // Font mapping for the tweakable font pair
  const fontCSS = fontPair === 'sans' ? `
    .va .serif { font-family: 'IBM Plex Sans', system-ui, sans-serif !important; font-weight: 500; }
  ` : fontPair === 'display' ? `
    .va .serif { font-family: 'Fraunces', Georgia, serif !important; }
  ` : '';

  return (
    <div className="va" style={{ minHeight: 900 }}>
      <style dangerouslySetInnerHTML={{ __html: A_FONTS + css + fontCSS }} />
      <AHeader T={T} current={current} setCurrent={setCurrent} />
      {current === 'home'         && <AHome         T={T} setCurrent={setCurrent} heroVariant={heroVariant} />}
      {current === 'about'        && <AAbout        T={T} />}
      {current === 'team'         && <ATeam         T={T} />}
      {current === 'calendar'     && <ACalendar     T={T} setCurrent={setCurrent} />}
      {current === 'event'        && <AEventDetail  T={T} setCurrent={setCurrent} />}
      {current === 'blog'         && <ABlog         T={T} setCurrent={setCurrent} />}
      {current === 'article'      && <AArticle      T={T} setCurrent={setCurrent} />}
      {current === 'contact'      && <AContact      T={T} />}
      {current === 'sponsor'      && <ASponsor      T={T} />}
      {current === 'transparency' && <ATransparency T={T} />}
      {current === 'privacy'      && <APrivacy      T={T} />}
      <AFooter T={T} setCurrent={setCurrent} />
    </div>
  );
}

Object.assign(window, { VariantA });
