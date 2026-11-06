
import { useState } from 'react';
import './App.css';

function App() {
  const [page, setPage] = useState<'customer' | 'driver'>('customer');
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [vehicle, setVehicle] = useState('Bike');
  const [number, setNumber] = useState('');
  const [license, setLicense] = useState('');
  const [message, setMessage] = useState('');

  const bn = language === 'bn';

  const registerDriver = () => {
    if (!name.trim() || !phone.trim() || !number.trim() || !license.trim()) {
      setMessage(bn ? 'সব তথ্য পূরণ করুন।' : 'Please fill in all fields.');
      return;
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      setMessage(bn ? 'সঠিক ১০ সংখ্যার মোবাইল নম্বর দিন।' : 'Enter a valid 10-digit mobile number.');
      return;
    }

    setMessage(
      bn
        ? 'রেজিস্ট্রেশন তথ্য Demo হিসেবে গ্রহণ করা হয়েছে। Admin Approval এখনও চালু হয়নি।'
        : 'Demo registration received. Admin approval is not active yet.'
    );
  };

  return (
    <main className="app">
      <header className="topbar">
        <div className="brand">
          <div className="logo">N</div>
          <div>
            <h2>Nexora Ride</h2>
            <small>Ride Smart. Live Better.</small>
          </div>
        </div>
        <button className="language" onClick={() => setLanguage(bn ? 'en' : 'bn')}>
          {bn ? 'English' : 'বাংলা'}
        </button>
      </header>

      <nav className="vehicles" style={{ marginTop: 18 }}>
        <button className={`vehicle ${page === 'customer' ? 'selected' : ''}`}
          onClick={() => { setPage('customer'); setMessage(''); }}>
          🚕 <strong>{bn ? 'যাত্রী' : 'Customer'}</strong>
        </button>
        <button className={`vehicle ${page === 'driver' ? 'selected' : ''}`}
          onClick={() => { setPage('driver'); setMessage(''); }}>
          🧑‍✈️ <strong>{bn ? 'চালক' : 'Driver'}</strong>
        </button>
      </nav>

      {page === 'customer' ? (
        <section className="booking">
          <h2>{bn ? 'Nexora Ride-এ স্বাগতম' : 'Welcome to Nexora Ride'}</h2>
          <p>{bn ? 'আপনার যাত্রা শুরু করুন।' : 'Start your journey.'}</p>
          <button className="book-button" onClick={() => setPage('driver')}>
            {bn ? 'চালক হিসেবে যোগ দিন' : 'Join as Driver'}
          </button>
        </section>
      ) : (
        <section className="booking">
          <h2>{bn ? 'চালক রেজিস্ট্রেশন' : 'Driver Registration'}</h2>
          <p>{bn ? 'Nexora Ride-এর সঙ্গে যুক্ত হন।' : 'Join the Nexora Ride team.'}</p>

          <label>{bn ? 'আপনার পুরো নাম' : 'Full Name'}</label>
          <input value={name} onChange={e => setName(e.target.value)}
            placeholder={bn ? 'নাম লিখুন' : 'Enter your name'} />

          <label>{bn ? 'মোবাইল নম্বর' : 'Mobile Number'}</label>
          <input type="tel" maxLength={10} value={phone}
            onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
            placeholder="10 digit mobile number" />

          <label>{bn ? 'গাড়ির ধরন' : 'Vehicle Type'}</label>
          <div className="vehicles">
            {['Bike', 'Auto', 'Car'].map(v => (
              <button key={v}
                className={`vehicle ${vehicle === v ? 'selected' : ''}`}
                onClick={() => setVehicle(v)}>
                {v === 'Bike' ? '🏍️' : v === 'Auto' ? '🛺' : '🚗'}
                <strong>{v}</strong>
              </button>
            ))}
          </div>

          <label>{bn ? 'গাড়ির নম্বর' : 'Vehicle Registration Number'}</label>
          <input value={number} onChange={e => setNumber(e.target.value.toUpperCase())}
            placeholder="WB XX XX 0000" />

          <label>{bn ? 'ড্রাইভিং লাইসেন্স নম্বর' : 'Driving Licence Number'}</label>
          <input value={license} onChange={e => setLicense(e.target.value.toUpperCase())}
            placeholder={bn ? 'লাইসেন্স নম্বর লিখুন' : 'Enter licence number'} />

          <button className="book-button" onClick={registerDriver}>
            {bn ? 'রেজিস্ট্রেশন জমা দিন' : 'Submit Registration'}
          </button>

          {message && <p className="message">{message}</p>}
          <small>{bn ? 'নোট: এটি Demo ফর্ম। তথ্য এখনও সার্ভারে সংরক্ষিত হচ্ছে না।' : 'Note: Demo form. Information is not saved to a server yet.'}</small>
        </section>
      )}

      <footer>
        <p>© 2026 Nexora Ride</p>
        <small>Bhatar • Burdwan • Nearby Areas</small>
      </footer>
    </main>
  );
}

export default App;
