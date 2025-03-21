// import { NextIntlClientProvider } from 'next-intl';
// import { getMessages } from 'next-intl/server';
// import React from 'react';

// const NextIntlProvider = async ({ children, params }) => {

//     const { locale } = await params;
//     const messages = await getMessages();

//     return (
//         <NextIntlClientProvider locale={locale || 'en' } messages={messages}>
//             {children}
//         </NextIntlClientProvider>
//     );
// }

// export default NextIntlProvider