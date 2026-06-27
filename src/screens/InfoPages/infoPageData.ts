export interface InfoSection {
  title: string;
  content: string;
}

export interface InfoPageData {
  title: string;
  subtitle: string;
  sections: InfoSection[];
}

const INFO_PAGES: Record<string, InfoPageData> = {
  meals: {
    title: 'Meals',
    subtitle: 'Curated dining options for villa guests',
    sections: [
      { title: 'Breakfast', content: 'Fresh morning menu with tea, coffee, eggs, parathas, and seasonal fruit. Served from 7:00 AM to 10:00 AM. Continental and Indian options available.' },
      { title: 'Lunch', content: 'Comfort Indian and continental plates curated for villa dining and long stays. Includes salads, grills, rice bowls, and regional specialties. Served from 12:00 PM to 3:00 PM.' },
      { title: 'Dinner', content: 'Chef-led evening setup with home-style curries, grills, and celebration add-ons. Features a 5-course menu with dessert. Served from 7:00 PM to 10:30 PM.' },
      { title: 'Other Services', content: 'Room service available 24/7. Special dietary requirements accommodated on request. Private dining and BBQ setups available for groups.' },
    ],
  },
  rules: {
    title: 'Villa Rules',
    subtitle: 'Please follow these guidelines for a pleasant stay',
    sections: [
      { title: 'Check-in & Check-out', content: 'Standard check-in time is 3:00 PM. Check-out time is 12:00 PM. Early check-in and late check-out are subject to availability.' },
      { title: 'Noise & Guests', content: 'Quiet hours are from 10:00 PM to 7:00 AM. Maximum occupancy is as per your booking. External visitors must be registered at the front desk.' },
      { title: 'Property Care', content: 'Please treat the villa and its furnishings with care. Any damages will be charged to the guest. Smoking is prohibited indoors.' },
      { title: 'Pool & Common Areas', content: 'Pool hours are 7:00 AM to 9:00 PM. Children must be supervised by adults at all times. Common areas should be kept clean and tidy.' },
    ],
  },
  deposit: {
    title: 'Security Deposit',
    subtitle: 'Refundable deposit information',
    sections: [
      { title: 'Deposit Amount', content: 'A security deposit of ₹5,000 is required at check-in. This is fully refundable upon check-out, subject to property inspection.' },
      { title: 'Payment Methods', content: 'Deposit can be paid via credit card, debit card, or UPI. Cash deposits are accepted at the front desk. A receipt will be provided.' },
      { title: 'Refund Process', content: 'Refunds are processed within 3-5 business days after check-out. The deposit is returned to the original payment method used.' },
      { title: 'Deductions', content: 'Deductions may apply for property damage, missing items, excessive cleaning, or violation of villa rules. Itemized deductions will be communicated.' },
    ],
  },
  checkin: {
    title: 'Check-in',
    subtitle: 'Everything you need for a smooth arrival',
    sections: [
      { title: 'Required Documents', content: 'Please carry a valid government-issued photo ID (Aadhaar, Passport, or Driver\'s License) and your booking confirmation.' },
      { title: 'Arrival Process', content: 'Report to the front desk upon arrival. Our staff will verify your documents, collect the security deposit, and hand over your room keys.' },
      { title: 'Early Check-in', content: 'Early check-in is available from 12:00 PM, subject to availability. Please contact us in advance to arrange this. Additional charges may apply.' },
      { title: 'Luggage Storage', content: 'Complimentary luggage storage is available if you arrive before check-in time. Contact the front desk to arrange secure storage.' },
    ],
  },
};

export const getInfoPageData = (type: string): InfoPageData | undefined =>
  INFO_PAGES[type];
