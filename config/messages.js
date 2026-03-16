export const MESSAGES = {
    welcome: (name) => `Olá, ${name}! Seja bem-vindo(a)! 👋`,
    intro: 'Sou seu assistente virtual. Como posso te ajudar?',
    menuPrompt: "Digite *!menu* para ver as opções disponíveis",

    trial: {
        generating: 'Aguarde enquanto gero seu acesso de teste...',
        wait: 'Isso pode levar alguns instantes dependendo da carga do servidor.',
        instructions: 'Use as credenciais acima para acessar seu teste. Para ajuda com configuração do player, envie *"!player"*',
        expired: (name) => `Olá ${name}, seu período de teste encerrou. Deseja assinar um plano?`,
    },
}

export const MENU_OPTIONS = {
    main: `
📋 MENU PRINCIPAL

1️⃣ Sobre nós
2️⃣ O que é IPTV?
3️⃣ Planos e preços
4️⃣ Assinar
5️⃣ Conteúdo disponível
6️⃣ Solicitar teste grátis

📌 Envie o número da opção para continuar.
`.trim(),

    about: `🔍 Sobre Nós

Oferecemos uma plataforma completa de IPTV com canais ao vivo, filmes, séries, esportes e muito mais.`,

    whatIsIptv: `📡 O que é IPTV?

IPTV é a transmissão de conteúdo de TV pela internet. Assista seus conteúdos favoritos no celular, TV ou computador sem cabos ou antenas.`,

    plans: `💰 Planos e Preços

- Mensal: R$ 25,00
- Trimestral: R$ 60,00
- Anual: R$ 200,00

Formas de pagamento: PIX, Cartão de Crédito, Transferência Bancária.`,

    subscription: `📝 Assinar

Para assinar agora, envie: assinar
Ou entre em contato com nosso suporte.`,

    content: `🎬 Conteúdo Disponível

+ Canais de TV ao vivo
+ Eventos esportivos (Futebol, UFC, etc.)
+ Filmes e séries em lançamento
+ Conteúdo infantil
+ Programação 24/7`,
}

export const CUSTOM_RESPONSES = {
    subscribe: `📲 Assinatura

Para assinar, envie seu nome completo e escolha um plano:
Mensal | Trimestral | Anual

Entraremos em contato em breve.`,

    requestTrial: `📺 *Teste Grátis*

Por favor, informe:

1️⃣ Nome completo
2️⃣ Cidade/Estado

Ativaremos seu acesso de 24h.`,
}

export const formatTrialResponse = (data) => {
    return `🎉 Acesso de teste gerado com sucesso!

👤 Usuário: ${data.username}
🔑 Senha: ${data.password}
🌐 DNS: ${data.dns}
📦 Pacote: ${data.package}
🔗 Conexões: ${data.connections}
📆 Criado em: ${data.createdAtFormatted}
⏰ Expira em: ${data.expiresAtFormatted}

📺 Link M3U: ${data.m3uUrl}
🔗 Link curto: ${data.shortUrl}

🛒 Pagamento: ${data.payUrl}`.trim()
}
