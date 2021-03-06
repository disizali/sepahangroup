import React, { Component } from "react";

export class Footer extends Component {
  render() {
    return (
      <footer className="rtl">
        <div>
          <img
            src={require("../public/images/logo.png")}
            alt="Sepahang group Logo | لوله و اتصالات سپاهان"
          />
          <p>
            آهن آلات سپاهان در سال 1386 فعالیت حرفه ای خود را در زمینه خرید و
            فروش آهن آلات آغاز نمود و در ادامه به منظور اطلاع رسانی شفاف و
            سریع‌تر سایت حاضر را راه‌اندازی کرد. شما می‌توانید در آهن آلات
            سپاهان اقدام به خرید انواع آهن آلات ساختمانی، صنعتی و سایر محصولات
            وارداتی از جمله میلگرد، تیرآهن، ورق سیاه، نبشی، ناودانی، پروفیل، ورق
            های آلیاژی و صنعتی، ورق های روغنی، گالوانیزه، انواع مقاطع استنلس
            استیل، مس و آلومینیوم نمایید.
          </p>
        </div>
        <div>
          <div>
            <i className="fas fa-phone" />
            <div>
              <span>۰۲۱</span>
              <strong>۶۶۲۴۸۹۰۲</strong>
            </div>
          </div>
          <div>
            <h3>خدمات مشتریان</h3>
            <p>
              مدیریت ارتباط با مشتریان سپاهان گروپ آماده هرگونه پاسخگویی در
              زمینه‌ی پیگیری، شکایات و نیاز مشتریان است!
            </p>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
