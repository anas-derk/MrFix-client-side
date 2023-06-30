import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ar" dir="rtl">
      <Head>
        {/* بداية استيراد ملف التنسيق ا لخاص بالبوتستراب */}
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
          crossOrigin="anonymous"
          />
        {/* نهاية استيراد ملف التنسيق ا لخاص بالبوتستراب */}
        {/* بداية استيراد الخطوط الخاصة بالموقع من غوغل */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Changa:wght@200;300;400;500;600&display=swap" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Lemonada:wght@300;400;500&display=swap" rel="stylesheet" />
        {/* نهاية استيراد الخطوط الخاصة بالموقع من غوغل */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
