"use client";

import { useState } from "react";

/* TIME LIST (30 min interval) */
const TIMES = Array.from({ length: 24 }, (_, h) =>
  [0, 30].map((m) => {
    const hour12 = ((h + 11) % 12) + 1;
    const period = h < 12 ? "AM" : "PM";
    return `${hour12.toString().padStart(2, "0")}:${m === 0 ? "00" : "30"} ${period}`;
  }),
).flat();

export default function BookNowForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
  });

  const [success, setSuccess] = useState(false);
  const [openTime, setOpenTime] = useState(false);

  const onChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    await fetch("/api/book-now", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setSuccess(true);
    setForm({
      name: "",
      email: "",
      phone: "",
      service: "",
      date: "",
      time: "",
    });

    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <>
      {/* SUCCESS POPUP */}
      {success && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="relative w-[90%] max-w-sm bg-white rounded-3xl p-8 text-center shadow-xl">
            {/* Close button */}
            <button
              onClick={() => setSuccess(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700 transition"
              aria-label="Close"
            >
              ✕
            </button>

            {/* Icon */}
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600 text-2xl">
              ✓
            </div>

            {/* Text */}
            <p className="text-xl font-medium text-[#151514]">
              Booking request sent
            </p>
            <p className="text-sm text-neutral-500 mt-2">
              We will get back to you within 24 hours.
            </p>

            {/* Action */}
            <button
              onClick={() => setSuccess(false)}
              className="mt-6 w-full rounded-full bg-[#1b1917] py-3 text-sm font-semibold text-white hover:opacity-90 transition"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {/* TIME PICKER MODAL */}
      {openTime && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white w-[320px] rounded-2xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <span className="font-medium">{form.time || "Select Time"}</span>
              <button
                onClick={() => setOpenTime(false)}
                className="text-lg text-neutral-500"
              >
                ✕
              </button>
            </div>

            {/* Time list */}
            <div className="max-h-[280px] overflow-y-auto">
              {TIMES.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => {
                    setForm((p) => ({ ...p, time: t }));
                    setOpenTime(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-sm hover:bg-neutral-100 ${
                    form.time === t ? "bg-neutral-100 font-medium" : ""
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FORM */}
      <div className="mx-auto mt-10 w-full max-w-[560px] bg-white rounded-[20px] shadow border border-neutral-200/60 p-8 md:p-12">
        <form
          onSubmit={onSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <Field label="Full Name">
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              className="w-full h-14 rounded-xl border bg-neutral-50 px-4"
              required
            />
          </Field>

          <Field label="Email Address">
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              className="w-full h-14 rounded-xl border bg-neutral-50 px-4"
              required
            />
          </Field>

          <Field label="Phone Number">
            <input
              name="phone"
              value={form.phone}
              onChange={onChange}
              className="w-full h-14 rounded-xl border bg-neutral-50 px-4"
              required
            />
          </Field>

          {/* SERVICE DROPDOWN (RESTORED) */}
          <Field label="Service Type">
            <select
              name="service"
              value={form.service}
              onChange={onChange}
              className="w-full h-14 rounded-xl border bg-neutral-50 px-4"
              required
            >
              <option value="" disabled>
                Select a service
              </option>
              <option value="product">Product Photography</option>
              <option value="editorial">Editorial Portraits</option>
              <option value="event">Event Coverage</option>
            </select>
          </Field>

          <Field label="Preferred Date">
            <input
              name="date"
              type="date"
              value={form.date}
              onChange={onChange}
              className="w-full h-14 rounded-xl border bg-neutral-50 px-4"
              required
            />
          </Field>

          {/* TIME PICKER BUTTON */}
          <Field label="Preferred Time">
            <button
              type="button"
              onClick={() => setOpenTime(true)}
              className="w-full h-14 rounded-xl border bg-neutral-50 px-4 flex items-center justify-between"
            >
              <span className={form.time ? "text-black" : "text-neutral-400"}>
                {form.time || "Select time"}
              </span>
              🕒
            </button>
          </Field>

          {/* SUBMIT */}
          <div className="md:col-span-2 pt-2">
            <button
              type="submit"
              className="w-full bg-[#1b1917] text-white py-4 rounded-xl text-lg font-serif cursor-pointer"
            >
              Request Booking
            </button>

            <p className="text-center text-sm text-neutral-500 mt-4">
              ⏱ Reply within 24 hours
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium px-1">{label}</label>
      {children}
    </div>
  );
}
