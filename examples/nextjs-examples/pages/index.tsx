import Head from 'next/head';
import { DolaWindow, Cart } from '../interfaces';
import styles from '../styles.module.css';
import Image from 'next/image';

const IndexPage = () => {
  const handleClick = () => {
    const sampleCart: Cart = {
      currency: 'USD',
      items: [
        {
          id: 'randomId',
          image: 'https://cdn.dola.me/swag-store/champion-dad-hat-black-front-604809c8b4a4f.jpg',
          quantity: 1,
          title: 'sample product - Dola hat',
          price: 100,
          grams: 30,
          sku: 'randomproductsku',
        },
      ],
    };

    const sampleCallback = () => {
      // this callback is called upon successful checkouts
      alert('successful checkout');
    };

    ((window as unknown) as DolaWindow).Dolapay.attachDola(sampleCart, sampleCallback);
  };

  return (
    <>
      <Head>
        <title>BEP + Next.js + TypeScript Example</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <script
          dangerouslySetInnerHTML={{
            __html: `!(function () {
              var t = "${process.env.NEXT_PUBLIC_MERCHANT_ID}",
                  e = window,
                  a = document;
              e.Dolapay = { id: t, type: "sdk" };
              var o = function () {
                var e = a.createElement("script");
                (e.type = "text/javascript"), (e.async = !0), (e.src = "https://bep.vercel.app");
                var o = a.getElementsByTagName("script")[0];
                o.parentNode.insertBefore(e, o);
              };
              "complete" === document.readyState ? o() : e.attachEvent ? e.attachEvent("onload", o) : e.addEventListener("load", o, !1);
            })();`,
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
            * { box-sizing: border-box; }
            html { height: 100%; } 
            body { margin: 0; -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale; }
          `,
          }}
        />
      </Head>

      <div className={styles.container}>
        <Image
          src="https://cdn.dola.me/swag-store/champion-dad-hat-black-front-604809c8b4a4f.jpg"
          alt="Dola swag hat"
          width={500}
          height={500}
        />

        <div
          className={styles.wrapper}
          onClick={() => {
            handleClick();
          }}
        >
          <div className={styles.paddedWrapper}>
            <div className={styles.buttonWrapper}>
              <button
                type="submit"
                name="add"
                className={`${styles.btn} ${styles.neutralDarkMode}`}
                id="dolapaybutton"
              >
                Check out with Dola
              </button>
              <div
                id="dolabuttonloader"
                style={{}}
                className={`${styles.overlay} ${styles.neutralOverlayDarkMode}`}
              >
                <div
                  className={`${styles.loaderBall} ${styles.dolaBall1} ${styles.neutralLoaderBallDarkMode}`}
                ></div>
                <div
                  className={`${styles.loaderBall} ${styles.ball2} ${styles.neutralLoaderBallDarkMode}`}
                ></div>
                <div
                  className={`${styles.loaderBall} ${styles.ball3} ${styles.neutralLoaderBallDarkMode}`}
                ></div>
              </div>
            </div>
          </div>
          <div className={styles.textWrapper}>
            <p className={styles.topText}>
              <span>&#9432;</span>Buy it now in 1-click.
              <span>
                <a href="https://dola.me" target="_blank">
                  Learn more.
                </a>
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndexPage;
