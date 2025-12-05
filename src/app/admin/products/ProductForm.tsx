import React from 'react';
import { ProductFormData } from '@/app/lib/types';

interface ProductFormProps {
  form: ProductFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  images: File[];
  setImages: (images: File[]) => void;
  handleSubmit: (e: React.FormEvent) => void;
  uploading: boolean;
  buttonText: string;
}

const ProductForm: React.FC<ProductFormProps> = ({ form, onChange, images, setImages, handleSubmit, uploading, buttonText }) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200">
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div>
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Product Information</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">This information will be displayed publicly so be careful what you share.</p>
          </div>

          <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Name</label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input type="text" name="name" id="name" value={form.name} onChange={onChange} required className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="sku" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">SKU</label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input type="text" name="sku" id="sku" value={form.sku} onChange={onChange} required className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Category</label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <select id="category" name="category" value={form.category} onChange={onChange} className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
                  <option>Rice</option><option>Millets</option><option>Pulses</option><option>Cereals</option><option>Flours</option><option>Cold-Pressed Oils</option><option>Spices & Herbs</option><option>Value-Added Products</option>
                </select>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Price (₹)</label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input type="number" name="price" id="price" value={String(form.price)} onChange={onChange} required className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Stock</label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input type="number" name="stock" id="stock" value={String(form.stock)} onChange={onChange} required className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="unit" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Unit</label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input type="text" name="unit" id="unit" value={form.unit} onChange={onChange} className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Description</label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <textarea id="description" name="description" value={form.description} onChange={onChange} rows={4} className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md" />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="images" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Images</label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input type="file" id="images" accept="image/*" multiple onChange={(e) => e.target.files && setImages(Array.from(e.target.files))} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100" />
                <div className="flex gap-2 mt-2">
                  {images.map((f, i) => <div key={i} className="text-xs text-slate-600">{f.name}</div>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button type="button" onClick={() => window.history.back()} className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Cancel</button>
          <button type="submit" disabled={uploading} className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-organicGreen hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">{buttonText}</button>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
