export async function onRequest(context) {
  const url = new URL(context.request.url);

  // Se a requisição foi feita para o subdomínio codigo.nfenglish.com.br
  if (url.hostname === 'codigo.nfenglish.com.br') {
    // Se o caminho ainda não estiver prefixado com /codigo
    if (!url.pathname.startsWith('/codigo')) {
      const rewrittenUrl = new URL(context.request.url);
      rewrittenUrl.pathname = '/codigo' + (url.pathname === '/' ? '/' : url.pathname);
      return context.env.ASSETS.fetch(new Request(rewrittenUrl.toString(), context.request));
    }
  }

  return context.next();
}
