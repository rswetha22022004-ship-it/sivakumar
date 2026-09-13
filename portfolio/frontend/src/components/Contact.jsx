import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { sendContactMessage } from '../services/api';
import TextGenerateEffect from './TextGenerateEffect';

const initialForm = { name: '', email: '', subject: '', message: '' };

export default function Contact({ profile }) {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await sendContactMessage(form);
      setStatus('sent');
      setForm(initialForm);
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="section">
      <TextGenerateEffect as="h2" className="section-heading">Contact</TextGenerateEffect>

      <div className="mt-10 grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-2 space-y-5">
          <a
            href={`mailto:${profile.email}`}
            className="skills-hover-card card relative overflow-hidden p-5 flex items-center gap-4 hover:border-accent/50 transition-colors"
            onMouseMove={(event) => {
              const bounds = event.currentTarget.getBoundingClientRect();
              event.currentTarget.style.setProperty('--mouse-x', `${event.clientX - bounds.left}px`);
              event.currentTarget.style.setProperty('--mouse-y', `${event.clientY - bounds.top}px`);
            }}
          >
            <Mail className="h-5 w-5 text-accent" />
            <TextGenerateEffect as="span" className="text-slate-300 text-sm break-all">{profile.email}</TextGenerateEffect>
          </a>
          <a
            href={`tel:${profile.phone}`}
            className="skills-hover-card card relative overflow-hidden p-5 flex items-center gap-4 hover:border-accent/50 transition-colors"
            onMouseMove={(event) => {
              const bounds = event.currentTarget.getBoundingClientRect();
              event.currentTarget.style.setProperty('--mouse-x', `${event.clientX - bounds.left}px`);
              event.currentTarget.style.setProperty('--mouse-y', `${event.clientY - bounds.top}px`);
            }}
          >
            <Phone className="h-5 w-5 text-accent" />
            <TextGenerateEffect as="span" className="text-slate-300 text-sm">{profile.phone}</TextGenerateEffect>
          </a>
          <div
            className="skills-hover-card card relative overflow-hidden p-5 flex items-center gap-4"
            onMouseMove={(event) => {
              const bounds = event.currentTarget.getBoundingClientRect();
              event.currentTarget.style.setProperty('--mouse-x', `${event.clientX - bounds.left}px`);
              event.currentTarget.style.setProperty('--mouse-y', `${event.clientY - bounds.top}px`);
            }}
          >
            <MapPin className="h-5 w-5 text-accent" />
            <TextGenerateEffect as="span" className="text-slate-300 text-sm">{profile.location}</TextGenerateEffect>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="skills-hover-card card relative overflow-hidden lg:col-span-3 p-6 sm:p-8 space-y-4"
          onMouseMove={(event) => {
            const bounds = event.currentTarget.getBoundingClientRect();
            event.currentTarget.style.setProperty('--mouse-x', `${event.clientX - bounds.left}px`);
            event.currentTarget.style.setProperty('--mouse-y', `${event.clientY - bounds.top}px`);
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              required name="name" placeholder="Your Name" value={form.name} onChange={handleChange}
              className="w-full rounded-lg border border-ink-600 bg-ink-800/60 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-accent focus:outline-none"
            />
            <input
              required type="email" name="email" placeholder="Your Email" value={form.email} onChange={handleChange}
              className="w-full rounded-lg border border-ink-600 bg-ink-800/60 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-accent focus:outline-none"
            />
          </div>
          <input
            required name="subject" placeholder="Subject" value={form.subject} onChange={handleChange}
            className="w-full rounded-lg border border-ink-600 bg-ink-800/60 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-accent focus:outline-none"
          />
          <textarea
            required name="message" placeholder="Message" rows={5} value={form.message} onChange={handleChange}
            className="w-full rounded-lg border border-ink-600 bg-ink-800/60 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-accent focus:outline-none resize-none"
          />

          <button type="submit" disabled={status === 'sending'} className="btn btn-primary w-full sm:w-auto">
            {status === 'sending' ? 'Sending…' : <>Send Message <Send className="h-4 w-4" /></>}
          </button>

          {status === 'sent' && (
            <p className="flex items-center gap-2 text-sm text-accent">
              <CheckCircle2 className="h-4 w-4" />
              <TextGenerateEffect as="span">Message sent successfully. Thank you!</TextGenerateEffect>
            </p>
          )}
          {status === 'error' && (
            <TextGenerateEffect as="p" className="text-sm text-red-400">
              Something went wrong. Please make sure the backend server is running and try again.
            </TextGenerateEffect>
          )}
        </form>
      </div>
    </section>
  );
}
