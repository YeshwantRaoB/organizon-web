"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedClient from "../../components/ProtectedClient";

interface BulkProduct {
  sku: string;
  name: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  unit: string;
}

export default function BulkUploadPage() {
  return (
    <ProtectedClient>
      <BulkUploadContent />
    </ProtectedClient>
  );
}

function BulkUploadContent() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<BulkProduct[]>([]);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.name.endsWith('.csv') && !selectedFile.name.endsWith('.json')) {
      setError('Please upload a CSV or JSON file');
      return;
    }

    setFile(selectedFile);
    setError('');
    setSuccess('');
    parseFile(selectedFile);
  };

  const parseFile = async (file: File) => {
    const text = await file.text();
    
    try {
      if (file.name.endsWith('.json')) {
        const data = JSON.parse(text);
        setPreview(Array.isArray(data) ? data : [data]);
      } else if (file.name.endsWith('.csv')) {
        const lines = text.split('\n').filter(line => line.trim());
        const headers = lines[0].split(',').map(h => h.trim());
        
        const products = lines.slice(1).map(line => {
          const values = line.split(',').map(v => v.trim());
          const product: Partial<BulkProduct> = {};
          
          headers.forEach((header, index) => {
            const value = values[index];
            const key = header as keyof BulkProduct;

            if (key === 'price' || key === 'stock') {
              (product[key] as number) = parseFloat(value) || 0;
            } else {
              (product[key] as string) = value;
            }
          });
          
          return product as BulkProduct;
        });
        
        setPreview(products);
      }
    } catch (err) {
      setError('Failed to parse file. Please check the format.');
      console.error(err);
    }
  };

  const handleUpload = async () => {
    if (!preview.length) {
      setError('No products to upload');
      return;
    }

    setUploading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/admin/bulk-products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products: preview }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      setSuccess(`Successfully uploaded ${data.count} products!`);
      setFile(null);
      setPreview([]);
      
      setTimeout(() => {
        router.push('/admin/products');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const downloadTemplate = (format: 'csv' | 'json') => {
    const template = [
      {
        sku: 'PROD001',
        name: 'Organic Basmati Rice',
        category: 'Rice & Grains',
        description: 'Premium quality organic basmati rice',
        price: 150,
        stock: 100,
        unit: '1 kg',
      },
      {
        sku: 'PROD002',
        name: 'Cold-Pressed Coconut Oil',
        category: 'Oils',
        description: 'Pure cold-pressed coconut oil',
        price: 350,
        stock: 50,
        unit: '500 ml',
      },
    ];

    let content: string;
    let filename: string;
    let type: string;

    if (format === 'json') {
      content = JSON.stringify(template, null, 2);
      filename = 'products-template.json';
      type = 'application/json';
    } else {
      const headers = ['sku', 'name', 'category', 'description', 'price', 'stock', 'unit'];
      const rows = template.map(p => 
        headers.map(h => p[h as keyof typeof p]).join(',')
      );
      content = [headers.join(','), ...rows].join('\n');
      filename = 'products-template.csv';
      type = 'text/csv';
    }

    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#f8f9f5] py-8">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Bulk Upload Products</h1>
              <p className="text-gray-600">Upload multiple products at once using CSV or JSON</p>
            </div>
            <button
              onClick={() => router.push('/admin/products')}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-bold text-blue-900 mb-3">📋 Instructions</h2>
          <ol className="list-decimal list-inside space-y-2 text-blue-800 text-sm">
            <li>Download a template file (CSV or JSON) below</li>
            <li>Fill in your product information following the template format</li>
            <li>Upload the completed file</li>
            <li>Review the preview and click &quot;Upload Products&quot;</li>
          </ol>
        </div>

        {/* Template Downloads */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Download Template</h2>
          <div className="flex gap-4">
            <button
              onClick={() => downloadTemplate('csv')}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-md transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download CSV Template
            </button>
            <button
              onClick={() => downloadTemplate('json')}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download JSON Template
            </button>
          </div>
        </div>

        {/* File Upload */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Upload File</h2>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#2d5016] transition-colors">
            <input
              type="file"
              accept=".csv,.json"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-lg font-semibold text-gray-700 mb-2">
                {file ? file.name : 'Click to upload or drag and drop'}
              </p>
              <p className="text-sm text-gray-500">CSV or JSON files only</p>
            </label>
          </div>

          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-md p-4">
              <p className="text-red-800 font-medium">{error}</p>
            </div>
          )}

          {success && (
            <div className="mt-4 bg-green-50 border border-green-200 rounded-md p-4">
              <p className="text-green-800 font-medium">{success}</p>
            </div>
          )}
        </div>

        {/* Preview */}
        {preview.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                Preview ({preview.length} products)
              </h2>
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="bg-[#2d5016] hover:bg-[#3d6820] text-white font-semibold px-6 py-3 rounded-md transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {uploading ? 'Uploading...' : 'Upload Products'}
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">SKU</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Name</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Category</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Price</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Stock</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Unit</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {preview.map((product, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-900">{product.sku}</td>
                      <td className="px-4 py-3 text-gray-900">{product.name}</td>
                      <td className="px-4 py-3 text-gray-600">{product.category}</td>
                      <td className="px-4 py-3 text-gray-900">₹{product.price}</td>
                      <td className="px-4 py-3 text-gray-600">{product.stock}</td>
                      <td className="px-4 py-3 text-gray-600">{product.unit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Format Guide */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Format Guide</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Required Fields:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                <li><strong>sku:</strong> Unique product identifier (e.g., PROD001)</li>
                <li><strong>name:</strong> Product name</li>
                <li><strong>category:</strong> Product category (Rice & Grains, Oils, Spices & Condiments, Sweeteners, Dairy)</li>
                <li><strong>description:</strong> Product description</li>
                <li><strong>price:</strong> Price in rupees (number)</li>
                <li><strong>stock:</strong> Available quantity (number)</li>
                <li><strong>unit:</strong> Unit of measurement (e.g., 1 kg, 500 ml)</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">CSV Format Example:</h3>
              <pre className="bg-gray-50 p-4 rounded-md text-xs overflow-x-auto">
{`sku,name,category,description,price,stock,unit
PROD001,Organic Basmati Rice,Rice & Grains,Premium quality organic basmati rice,150,100,1 kg
PROD002,Cold-Pressed Coconut Oil,Oils,Pure cold-pressed coconut oil,350,50,500 ml`}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">JSON Format Example:</h3>
              <pre className="bg-gray-50 p-4 rounded-md text-xs overflow-x-auto">
{`[
  {
    "sku": "PROD001",
    "name": "Organic Basmati Rice",
    "category": "Rice & Grains",
    "description": "Premium quality organic basmati rice",
    "price": 150,
    "stock": 100,
    "unit": "1 kg"
  }
]`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
