import React, { useState } from 'react';
import { Mail, Send, MessageCircle, ArrowRight } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import Card3D from '../common/Card3D/Card3D';
import Button3D from '../common/Button3D/Button3D';
import Icon3D from '../common/Icon3D/Icon3D';

/**
 * Contact Info Card Component - Reusable
 */
interface ContactInfoCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
  shadowColor: string;
  borderColor: string;
}

const ContactInfoCard: React.FC<ContactInfoCardProps> = ({
  icon,
  title,
  value,
  description,
  shadowColor,
  borderColor,
}) => (
  <Card3D
    borderColor={borderColor}
    shadowColor={shadowColor}
    className="p-4 sm:p-5 md:p-6 lg:p-8 group hover:-translate-y-1 transition-transform duration-300"
  >
    <div className="flex flex-col gap-3 sm:gap-4 md:gap-5">
      <Icon3D variant="primary" size="md">
        {React.cloneElement(icon as React.ReactElement, {
          className: 'w-5 sm:w-6 h-5 sm:h-6 text-white',
        } as any)}
      </Icon3D>

      <div>
        <h4 className="text-base sm:text-lg md:text-xl font-black text-white mb-1 sm:mb-2">
          {title}
        </h4>
        <p className="text-indigo-400 font-bold text-sm sm:text-base group-hover:text-indigo-300 transition-colors">
          {value}
        </p>
      </div>

      <p className="text-slate-400 text-xs sm:text-sm font-medium leading-relaxed">
        {description}
      </p>
    </div>
  </Card3D>
);

/**
 * Contact Form Component - Reusable
 */
interface ContactFormProps {
  shadowColor: string;
  borderColor: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ shadowColor, borderColor }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  return (
    <Card3D
      borderColor={borderColor}
      shadowColor={shadowColor}
      className="p-4 sm:p-6 md:p-8 lg:p-12"
    >
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
        {/* Name and Email Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          <div className="space-y-2 sm:space-y-3">
            <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
              {t('contact.form.name', 'To\'liq Ismingiz')}
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-500 focus:bg-white/10 transition-all placeholder:text-slate-600 font-medium"
              placeholder={t('contact.form.name_placeholder', 'Asadbek Aliyev')}
              required
            />
          </div>
          <div className="space-y-2 sm:space-y-3">
            <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
              {t('contact.form.email', 'Email Manzilingiz')}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-500 focus:bg-white/10 transition-all placeholder:text-slate-600 font-medium"
              placeholder={t('contact.form.email_placeholder', 'example@buddy.uz')}
              required
            />
          </div>
        </div>

        {/* Message */}
        <div className="space-y-2 sm:space-y-3">
          <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
            {t('contact.form.message', 'Xabaringiz Mazmuni')}
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-500 focus:bg-white/10 transition-all h-32 sm:h-40 md:h-48 resize-none placeholder:text-slate-600 font-medium"
            placeholder={t('contact.form.message_placeholder', 'Qanday masalada yordam bera olamiz?')}
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <Button3D
          variant="primary"
          className="w-full py-3 sm:py-3.5 md:py-4 px-6 text-xs sm:text-sm md:text-base font-bold flex items-center justify-center gap-2"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          <Send className="w-4 sm:w-5 h-4 sm:h-5" />
          <span>{isSubmitting ? t('contact.form.sending', 'Yuborilmoqda...') : t('contact.form.send', 'Xabar Yuborish')}</span>
        </Button3D>
      </form>
    </Card3D>
  );
};

/**
 * Contact Section - Get in Touch
 */
const Contact: React.FC = () => {
  const { t } = useTranslation();
  const shadowColor = 'rgb(168, 85, 247)';
  const borderColor = 'rgb(79, 70, 229)';

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-28 lg:py-36 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24">
          <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] mb-4 sm:mb-6 md:mb-8 text-white">
            {t('contact.title', 'Savollaringiz')} <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              {t('contact.title_highlight', 'Bormi?')}
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
            {t('contact.description', 'Bizning jamoaga qo\'shilish yoki hamkorlik qilish bo\'yicha har qanday savollaringizni kutamiz.')}
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 items-start">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-5 md:space-y-6">
            <ContactInfoCard
              icon={<Mail className="w-6 h-6" />}
              title={t('contact.email_title', 'Elektron Pochta')}
              value="hello@buddyteam.uz"
              description={t('contact.email_desc', '24/7 Aloqada')}
              shadowColor={shadowColor}
              borderColor={borderColor}
            />

            <ContactInfoCard
              icon={<MessageCircle className="w-6 h-6" />}
              title={t('contact.telegram_title', 'Telegram Kanal')}
              value="@buddyteam_official"
              description={t('contact.telegram_desc', 'Jamoa Yangiliklari')}
              shadowColor={shadowColor}
              borderColor={borderColor}
            />
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <ContactForm shadowColor={shadowColor} borderColor={borderColor} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
