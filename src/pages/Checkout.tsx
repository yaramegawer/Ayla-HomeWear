import { HiTrash as TrashIcon } from "react-icons/hi2";
import { Button } from "../components";
import { useAppDispatch, useAppSelector } from "../hooks";
import { removeProductFromTheCart, clearCart } from "../features/cart/cartSlice";
import customFetch from "../axios/custom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import type { ProductInCart } from "../typings";

// Function to generate WhatsApp link with correct phone number
const generateWhatsAppLink = (phone: string) => {
  // Remove any non-digit characters and ensure it starts with country code
  const cleanPhone = phone.replace(/\D/g, '');
  const phoneNumber = cleanPhone.startsWith('20') ? cleanPhone : `20${cleanPhone}`;
  return `https://wa.me/${phoneNumber}`;
};

// Egyptian Governorates with shipping costs
const egyptianGovernorates = [
  // Cairo
  { name: "Cairo", shippingCost: 90 },
  { name: "New Cairo", shippingCost: 90 },
  { name: "Nasr City", shippingCost: 90 },
  { name: "Heliopolis", shippingCost: 90 },
  { name: "Maadi", shippingCost: 90 },
  { name: "Helwan", shippingCost: 100 },
  { name: "Shorouk", shippingCost: 100 },
  { name: "Badr City", shippingCost: 110 },
  { name: "Obour City", shippingCost: 100 },
  { name: "New Administrative Capital", shippingCost: 110 },

  // Giza
  { name: "Giza", shippingCost: 85 },
  { name: "6th of October", shippingCost: 85 },
  { name: "Sheikh Zayed", shippingCost: 85 },
  { name: "Hadayek October", shippingCost: 95 },
  { name: "Haram", shippingCost: 85 },
  { name: "Faisal", shippingCost: 85 },
  { name: "Dokki", shippingCost: 85 },
  { name: "Mohandessin", shippingCost: 85 },
  { name: "Agouza", shippingCost: 85 },
  { name: "Imbaba", shippingCost: 85 },
  { name: "Bulaq El Dakrour", shippingCost: 85 },
  { name: "Kerdasa", shippingCost: 100 },
  { name: "Abu Rawash", shippingCost: 100 },

  // Alexandria
  { name: "Alexandria", shippingCost: 110 },
  { name: "Agami", shippingCost: 120 },
  { name: "Borg El Arab", shippingCost: 130 },
  { name: "King Mariout", shippingCost: 130 },
  { name: "Abu Qir", shippingCost: 120 },
  { name: "Montaza", shippingCost: 110 },

  // Qalyubia
  { name: "Banha", shippingCost: 110 },
  { name: "Shubra El Kheima", shippingCost: 95 },
  { name: "Qalyub", shippingCost: 100 },
  { name: "Obour", shippingCost: 100 },
  { name: "Khanka", shippingCost: 110 },
  { name: "Kafr Shukr", shippingCost: 120 },
  { name: "Tukh", shippingCost: 110 },

  // Sharqia
  { name: "Zagazig", shippingCost: 110 },
  { name: "10th of Ramadan", shippingCost: 110 },
  { name: "Belbeis", shippingCost: 110 },
  { name: "Minya El Qamh", shippingCost: 120 },
  { name: "Abu Hammad", shippingCost: 120 },
  { name: "Faqous", shippingCost: 130 },
  { name: "Husseiniya", shippingCost: 140 },
  { name: "Diyarb Negm", shippingCost: 120 },

  // Dakahlia
  { name: "Mansoura", shippingCost: 110 },
  { name: "Talkha", shippingCost: 110 },
  { name: "Mit Ghamr", shippingCost: 120 },
  { name: "Aga", shippingCost: 120 },
  { name: "Sherbin", shippingCost: 130 },
  { name: "Dekernes", shippingCost: 120 },
  { name: "Manzala", shippingCost: 140 },
  { name: "Gamasa", shippingCost: 130 },

  // Gharbia
  { name: "Tanta", shippingCost: 110 },
  { name: "El Mahalla El Kubra", shippingCost: 110 },
  { name: "Kafr El Zayat", shippingCost: 120 },
  { name: "Zefta", shippingCost: 120 },
  { name: "Samanoud", shippingCost: 120 },
  { name: "Basyoun", shippingCost: 120 },

  // Monufia
  { name: "Shebin El Kom", shippingCost: 110 },
  { name: "Menouf", shippingCost: 120 },
  { name: "Ashmoun", shippingCost: 120 },
  { name: "Sadat City", shippingCost: 120 },
  { name: "Tala", shippingCost: 120 },
  { name: "Quesna", shippingCost: 110 },

  // Kafr El Sheikh
  { name: "Kafr El Sheikh", shippingCost: 120 },
  { name: "Desouk", shippingCost: 120 },
  { name: "Fuwwah", shippingCost: 130 },
  { name: "Baltim", shippingCost: 140 },
  { name: "Sidi Salem", shippingCost: 130 },
  { name: "Biyala", shippingCost: 130 },

  // Beheira
  { name: "Damanhour", shippingCost: 120 },
  { name: "Kafr El Dawwar", shippingCost: 120 },
  { name: "Rashid", shippingCost: 130 },
  { name: "Edku", shippingCost: 130 },
  { name: "Abu Hummus", shippingCost: 130 },
  { name: "Hosh Issa", shippingCost: 130 },
  { name: "Wadi El Natrun", shippingCost: 140 },

  // Ismailia
  { name: "Ismailia", shippingCost: 110 },
  { name: "Fayed", shippingCost: 120 },
  { name: "Qantara East", shippingCost: 140 },
  { name: "Qantara West", shippingCost: 120 },
  { name: "Abu Suweir", shippingCost: 120 },

  // Suez
  { name: "Suez", shippingCost: 110 },
  { name: "Ain Sokhna", shippingCost: 150 },

  // Port Said
  { name: "Port Said", shippingCost: 120 },
  { name: "Port Fouad", shippingCost: 120 },

  // Damietta
  { name: "Damietta", shippingCost: 120 },
  { name: "New Damietta", shippingCost: 120 },
  { name: "Ras El Bar", shippingCost: 130 },
  { name: "Faraskour", shippingCost: 130 },
  { name: "Kafr Saad", shippingCost: 130 },

  // Fayoum
  { name: "Faiyum", shippingCost: 120 },
  { name: "Ibshaway", shippingCost: 130 },
  { name: "Sinnuris", shippingCost: 120 },
  { name: "Tamiya", shippingCost: 130 },
  { name: "Youssef El Seddik", shippingCost: 150 },

  // Beni Suef
  { name: "Beni Suef", shippingCost: 130 },
  { name: "Biba", shippingCost: 140 },
  { name: "Nasser", shippingCost: 130 },
  { name: "Ihnasia", shippingCost: 140 },
  { name: "Sumusta", shippingCost: 140 },

  // Minya
  { name: "Minya", shippingCost: 140 },
  { name: "Maghagha", shippingCost: 150 },
  { name: "Beni Mazar", shippingCost: 150 },
  { name: "Matay", shippingCost: 150 },
  { name: "Samalut", shippingCost: 140 },
  { name: "Abu Qurqas", shippingCost: 140 },
  { name: "Mallawi", shippingCost: 150 },
  { name: "Deir Mawas", shippingCost: 160 },

  // Assiut
  { name: "Asyut", shippingCost: 150 },
  { name: "Abnub", shippingCost: 160 },
  { name: "Manfalut", shippingCost: 160 },
  { name: "Qusiya", shippingCost: 160 },
  { name: "Dairut", shippingCost: 160 },
  { name: "El Badari", shippingCost: 170 },

  // Sohag
  { name: "Sohag", shippingCost: 160 },
  { name: "Akhmim", shippingCost: 160 },
  { name: "Girga", shippingCost: 170 },
  { name: "Tahta", shippingCost: 160 },
  { name: "Tima", shippingCost: 170 },
  { name: "El Maragha", shippingCost: 170 },
  { name: "Dar El Salam", shippingCost: 180 },

  // Qena
  { name: "Qena", shippingCost: 170 },
  { name: "Nag Hammadi", shippingCost: 170 },
  { name: "Qus", shippingCost: 170 },
  { name: "Dishna", shippingCost: 180 },
  { name: "Abu Tesht", shippingCost: 180 },
  { name: "Farshut", shippingCost: 180 },

  // Luxor
  { name: "Luxor", shippingCost: 180 },
  { name: "Esna", shippingCost: 190 },
  { name: "Armant", shippingCost: 190 },
  { name: "El Tod", shippingCost: 190 },
  { name: "Qurna", shippingCost: 190 },

  // Aswan
  { name: "Aswan", shippingCost: 190 },
  { name: "Kom Ombo", shippingCost: 200 },
  { name: "Edfu", shippingCost: 200 },
  { name: "Daraw", shippingCost: 200 },
  { name: "Abu Simbel", shippingCost: 250 },

  // Red Sea
  { name: "Hurghada", shippingCost: 180 },
  { name: "El Gouna", shippingCost: 190 },
  { name: "Safaga", shippingCost: 200 },
  { name: "Quseir", shippingCost: 220 },
  { name: "Marsa Alam", shippingCost: 250 },
  { name: "Ras Ghareb", shippingCost: 200 },

  // Matrouh
  { name: "Marsa Matrouh", shippingCost: 200 },
  { name: "El Alamein", shippingCost: 170 },
  { name: "New Alamein", shippingCost: 170 },
  { name: "Sidi Abdel Rahman", shippingCost: 190 },
  { name: "Sallum", shippingCost: 250 },
  { name: "Siwa", shippingCost: 250 },

  // North Sinai
  { name: "Arish", shippingCost: 180 },
  { name: "Bir El Abd", shippingCost: 200 },
  { name: "Sheikh Zuweid", shippingCost: 220 },
  { name: "Rafah", shippingCost: 250 },

  // South Sinai
  { name: "Sharm El Sheikh", shippingCost: 220 },
  { name: "Dahab", shippingCost: 230 },
  { name: "Nuweiba", shippingCost: 240 },
  { name: "Taba", shippingCost: 250 },
  { name: "Saint Catherine", shippingCost: 250 },
  { name: "El Tor", shippingCost: 200 },

  // New Valley
  { name: "Kharga", shippingCost: 220 },
  { name: "Dakhla", shippingCost: 250 },
  { name: "Farafra", shippingCost: 270 },
  { name: "Baris", shippingCost: 270 }

];

const Checkout = () => {
  const { productsInCart, subtotal } = useAppSelector((state) => state.cart as { productsInCart: ProductInCart[], subtotal: number });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedGovernment, setSelectedGovernment] = useState("");
  const [shippingCost, setShippingCost] = useState(65);
  const [fieldErrors, setFieldErrors] = useState<{
    customerName?: string;
    phone?: string;
    address?: string;
    government?: string;
  }>({});
  const [orderData, setOrderData] = useState<{
    success: boolean;
    message: string;
    data: {
      _id: string;
      customerName: string;
      phone: string;
      address: string;
      government: string;
      shippingCost: number;
      totalPrice: number;
      depositAmount: number;
      dueAmount: number;
    };
    depositInfo: {
      amount: number;
      paymentMethod: string;
      instructions: string;
      whatsappLink: string;
    };
  } | null>(null);

  // Calculate totals
  const itemsPrice = subtotal;
  const totalPrice = itemsPrice + shippingCost;
  const depositAmount = itemsPrice * 0.5; // 50% of items price (excluding shipping)
  const dueAmount = totalPrice - depositAmount;

  // Handle government change
  const handleGovernmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const government = e.target.value;
    setSelectedGovernment(government);

    const gov = egyptianGovernorates.find(g => g.name === government);
    if (gov) {
      setShippingCost(gov.shippingCost);
    }
  };

  // Validate form fields
  const validateForm = (formData: FormData) => {
    const errors: typeof fieldErrors = {};

    const customerName = formData.get('customerName') as string;
    const phone = formData.get('phone') as string;
    const address = formData.get('address') as string;

    console.log('Validating form data:', { customerName, phone, address, selectedGovernment });

    if (!customerName || customerName.trim() === '') {
      errors.customerName = 'Full name is required';
    }

    if (!phone || phone.trim() === '') {
      errors.phone = 'Phone number is required';
    } else if (!/^01[0-9]{9}$/.test(phone.replace(/\s/g, ''))) {
      errors.phone = 'Please enter a valid Egyptian phone number (01xxxxxxxxx)';
    }

    if (!address || address.trim() === '') {
      errors.address = 'Delivery address is required';
    } else if (address.trim().length < 10) {
      errors.address = 'Please enter a complete delivery address';
    }

    if (!selectedGovernment) {
      errors.government = 'Please select a governorate';
    }

    console.log('Validation errors:', errors);
    return errors;
  };

  // Handle form submission
  const handleCheckoutSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log('=== FORM SUBMISSION TRIGGERED ===');
    e.preventDefault();
    console.log('Form submission started');
    setIsSubmitting(true);

    // Clear previous errors
    setFieldErrors({});

    const formData = new FormData(e.currentTarget);
    console.log('Form data entries:', Array.from(formData.entries()));

    const errors = validateForm(formData);
    console.log('Errors found:', errors);

    if (Object.keys(errors).length > 0) {
      console.log('Setting field errors:', errors);
      setFieldErrors(errors);
      const errorMessages = Object.values(errors).join(', ');
      toast.error(`Please fix the following errors: ${errorMessages}`);
      setIsSubmitting(false);
      return;
    }

    // Validate products have required data
    const invalidProducts = productsInCart.filter(product =>
      !product._id || !product.quantity || !product.price || !product.color || !product.size
    );

    if (invalidProducts.length > 0) {
      const productNames = invalidProducts.map(p => p.name).join(', ');
      toast.error(`The following products have missing size or color information: ${productNames}. Please remove them from cart and re-add with proper selections.`);
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new FormData(e.currentTarget);
      const customerData = {
        customerName: formData.get('customerName') as string,
        phone: formData.get('phone') as string,
        address: formData.get('address') as string,
        government: selectedGovernment,
        shippingCost: shippingCost,
        depositPaymentMethod: "vodafone_cash",
        duePaymentMethod: "vodafone_cash",
        products: productsInCart.map(product => ({
          productId: product._id,
          quantity: product.quantity,
          color: product.color,
          size: product.size
        }))
      };

      console.log('Submitting order data:', customerData);
      console.log('Products being sent (price calculated by backend):', productsInCart.map(p => ({
        name: p.name,
        productId: p._id,
        quantity: p.quantity,
        color: p.color,
        size: p.size
      })));
      const response = await customFetch.post("/order", customerData);
      console.log('Order response:', response.data);

      if (response.data.success) {
        // Clear cart immediately after successful order creation
        dispatch(clearCart());
        setOrderData(response.data);
        toast.success("Order created successfully!");

        // Auto-open WhatsApp after 2 seconds
        setTimeout(() => {
          const correctWhatsAppLink = generateWhatsAppLink('010 92851229');
          console.log('Opening WhatsApp link:', correctWhatsAppLink);
          window.open(correctWhatsAppLink, '_blank');
        }, 2000);
      } else {
        console.log('No WhatsApp link found in response');
        toast.error('WhatsApp link not available. Please contact support.');
        toast.error(response.data.message || "Failed to create order");
      }
    } catch (error: any) {
      console.error('Order creation error:', error);
      console.error('Error response:', error.response?.data);

      if (error.response?.data?.errors) {
        const errorMessages = error.response.data.errors.map((err: any) => err.message).join(', ');
        toast.error(`Validation errors: ${errorMessages}`);
      } else {
        toast.error(error.response?.data?.message || "Failed to create order. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format price with 2 decimal places
  const formatPrice = (price: number) => {
    return price.toFixed(2);
  };

  if (orderData) {
    return (
      <div className="mx-auto max-w-screen-2xl px-5 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Created Successfully!</h1>
            <p className="text-lg text-gray-600 mb-2">Order ID: #{orderData.data._id}</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8 text-left">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Customer Name:</span>
                <span className="font-medium">{orderData.data.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phone:</span>
                <span className="font-medium">{orderData.data.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Address:</span>
                <span className="font-medium">{orderData.data.address}, {orderData.data.government}</span>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Items Total:</span>
                  <span className="font-medium">{formatPrice(orderData.data.totalPrice - orderData.data.shippingCost)} EGP</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping Cost:</span>
                  <span className="font-medium">{formatPrice(orderData.data.shippingCost)} EGP</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Price:</span>
                  <span className="font-medium">{formatPrice(orderData.data.totalPrice)} EGP</span>
                </div>
                <div className="flex justify-between font-semibold text-green-600">
                  <span>Deposit (50%):</span>
                  <span>{formatPrice(orderData.data.depositAmount)} EGP</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Due Amount:</span>
                  <span className="font-medium">{formatPrice(orderData.data.dueAmount)} EGP</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-green-800 mb-3">الخطوات التالية - دفع الإيداع</h3>
            <div className="text-left space-y-2 text-sm text-green-700">
              <p>• يرجى إرسال إيداع بقيمة <strong>{formatPrice(orderData.data.depositAmount)} جنيه</strong> إلى رقم فودافون كاش: <strong>01033727566</strong>.</p>
              <p>• بعد الإرسال، اضغط على زر واتساب أدناه وأرسل صورة من الإيداع لتأكيد الدفع.</p>
              <p>• سيتم معالجة طلبك وتأكيده بمجرد تأكيد الإيداع عبر رسالة واتساب على رقم الهاتف الذي أدخلته.</p>
            </div>

            <div className="mt-6 space-y-3">
              <a
                href={generateWhatsAppLink('01033727566')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                إرسال تأكيد الإيداع عبر واتساب
              </a>

              <button
                onClick={() => {
                  // Redirect to home (cart already cleared)
                  navigate('/');
                }}
                className="w-full bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                العودة للصفحة الرئيسية
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-screen-2xl">
      <div className="pb-24 pt-16 px-5 max-[400px]:px-3">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <form
          onSubmit={handleCheckoutSubmit}
          className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
        >
          <div>
            {/* Customer Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Customer Information</h2>

              <div className="space-y-4">
                <div>
                  <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="customerName"
                    name="customerName"
                    required
                    className={`block w-full py-2 px-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondaryBrown ${fieldErrors.customerName
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:border-secondaryBrown'
                      }`}
                  />
                  {fieldErrors.customerName && (
                    <p className="mt-1 text-sm text-red-600">{fieldErrors.customerName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    placeholder="01xxxxxxxxx"
                    className={`block w-full py-2 px-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondaryBrown ${fieldErrors.phone
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:border-secondaryBrown'
                      }`}
                  />
                  {fieldErrors.phone && (
                    <p className="mt-1 text-sm text-red-600">{fieldErrors.phone}</p>
                  )}
                </div>


                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery Address *
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    required
                    rows={3}
                    className={`block w-full py-2 px-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondaryBrown ${fieldErrors.address
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:border-secondaryBrown'
                      }`}
                    placeholder="Enter your complete delivery address"
                  />
                  {fieldErrors.address && (
                    <p className="mt-1 text-sm text-red-600">{fieldErrors.address}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="government" className="block text-sm font-medium text-gray-700 mb-1">
                    Governorate * (Shipping cost will be calculated based on selection)
                  </label>
                  <select
                    id="government"
                    name="government"
                    value={selectedGovernment}
                    onChange={handleGovernmentChange}
                    required
                    className={`block w-full py-2 px-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondaryBrown ${fieldErrors.government
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:border-secondaryBrown'
                      }`}
                  >
                    <option value="">Select Governorate</option>
                    {egyptianGovernorates.map((gov) => (
                      <option key={gov.name} value={gov.name}>
                        {gov.name} (Shipping: {gov.shippingCost} EGP)
                      </option>
                    ))}
                  </select>
                  {fieldErrors.government && (
                    <p className="mt-1 text-sm text-red-600">{fieldErrors.government}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Payment Information</h2>

              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 mb-2">Deposit Payment Required</h3>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• 50% deposit required to confirm order</p>
                    <p>• Deposit amount: {formatPrice(depositAmount)} EGP</p>
                    <p>• Payment method: Vodafone Cash</p>
                    <p>• Due amount: {formatPrice(dueAmount)} EGP (Cash on Delivery)</p>
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Vodafone Cash Details</h3>
                  <div className="text-sm text-gray-700">
                    <p>Number: <strong>01033727566</strong>.</p>
                    <p>After order creation, you'll receive a WhatsApp link to confirm payment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="mt-10 lg:mt-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>

              {/* Products */}
              <div className="space-y-4 mb-6">
                {productsInCart.map((product) => (
                  <div key={product._id} className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        src={product.defaultImage?.url || product.images?.[0]?.url || '/assets/banner.jpg'}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {product.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {product.color} {product.size && `• ${product.size}`}
                      </p>
                      <p className="text-sm text-gray-500">
                        Qty: {product.quantity} × {formatPrice(product.price)} EGP
                      </p>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {formatPrice(product.price * product.quantity)} EGP
                    </div>
                    <button
                      type="button"
                      onClick={() => dispatch(removeProductFromTheCart({ id: product.id }))}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-gray-200 pt-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Items Subtotal</span>
                  <span className="font-medium">{formatPrice(itemsPrice)} EGP</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping Cost</span>
                  <span className="font-medium">{formatPrice(shippingCost)} EGP</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Price</span>
                  <span className="font-medium">{formatPrice(totalPrice)} EGP</span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-green-600 bg-green-50 p-3 rounded">
                  <span>Deposit (50%)</span>
                  <span>{formatPrice(depositAmount)} EGP</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Due on Delivery</span>
                  <span className="font-medium">{formatPrice(dueAmount)} EGP</span>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8">
                <Button
                  text={isSubmitting ? "Creating Order..." : "Create Order & Pay Deposit"}
                  mode="brown"
                  disabled={isSubmitting || productsInCart.length === 0}
                  type="submit"
                />
                <p className="text-xs text-gray-500 text-center mt-2">
                  By placing this order, you agree to pay 50% deposit via Vodafone Cash
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
