
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, AlertCircle, Info, Download, CheckCircle, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { processSalesData } from "@/utils/dataProcessor";
import { useSalesData } from "@/contexts/SalesDataContext";
import * as XLSX from 'xlsx';

export const FileUpload = () => {
  const { toast } = useToast();
  const { setSalesData, setIsUsingUploadedData } = useSalesData();
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const validateFile = (file: File): string[] => {
    const errors: string[] = [];
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    if (file.size > maxSize) {
      errors.push('File size must be less than 10MB');
    }
    
    const validTypes = [
      'text/csv',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel'
    ];
    
    if (!validTypes.includes(file.type) && !file.name.match(/\.(csv|xlsx|xls)$/i)) {
      errors.push('File must be CSV, XLS, or XLSX format');
    }
    
    return errors;
  };

  const onDrop = useCallback(async (acceptedFiles: File[], rejectedFiles: any[]) => {
    const file = acceptedFiles[0];
    
    if (rejectedFiles.length > 0) {
      setValidationErrors(['Invalid file type. Please upload CSV, XLS, or XLSX files only.']);
      setUploadStatus('error');
      return;
    }
    
    if (!file) return;

    const errors = validateFile(file);
    if (errors.length > 0) {
      setValidationErrors(errors);
      setUploadStatus('error');
      return;
    }

    setValidationErrors([]);
    setUploadStatus('uploading');

    try {
      const processedData = await processSalesData(file);
      setSalesData(processedData);
      setIsUsingUploadedData(true);
      setUploadStatus('success');
      
      toast({
        title: "File uploaded successfully!",
        description: `Processed ${file.name} and generated analytics.`,
      });
      
      // Reset to idle after 3 seconds
      setTimeout(() => setUploadStatus('idle'), 3000);
    } catch (error) {
      setUploadStatus('error');
      setValidationErrors(['Failed to process file. Please check the format and try again.']);
      toast({
        title: "Upload failed",
        description: "Please check your file format and try again.",
        variant: "destructive",
      });
      console.error('File processing error:', error);
    }
  }, [setSalesData, setIsUsingUploadedData, toast]);

  const downloadSampleFile = () => {
    const sampleData = [
      {
        'Date': '2024-01-15',
        'Product': 'iPhone 15',
        'Category': 'Electronics',
        'Sales Amount': 999,
        'Customer': 'John Doe',
        'Region': 'North America'
      },
      {
        'Date': '2024-01-16',
        'Product': 'Nike Shoes',
        'Category': 'Sports',
        'Sales Amount': 150,
        'Customer': 'Jane Smith',
        'Region': 'Europe'
      },
      {
        'Date': '2024-01-17',
        'Product': 'Samsung TV',
        'Category': 'Electronics',
        'Sales Amount': 799,
        'Customer': 'Bob Johnson',
        'Region': 'Asia Pacific'
      }
    ];

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(sampleData);
    XLSX.utils.book_append_sheet(wb, ws, "Sample Sales Data");
    XLSX.writeFile(wb, "sample-sales-data.xlsx");
    
    toast({
      title: "Sample file downloaded",
      description: "Use this as a template for your data upload.",
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls']
    },
    maxFiles: 1
  });

  const getDropzoneStyles = () => {
    if (uploadStatus === 'success') {
      return 'border-green-500 bg-green-500/10 border-solid';
    }
    if (uploadStatus === 'error') {
      return 'border-red-500 bg-red-500/10 border-solid';
    }
    if (isDragActive) {
      return 'border-blue-500 bg-blue-500/10 border-solid scale-105';
    }
    return 'border-gray-600 hover:border-blue-500 hover:bg-blue-500/5';
  };

  const renderUploadContent = () => {
    if (uploadStatus === 'uploading') {
      return (
        <div className="animate-pulse">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-500/20 flex items-center justify-center">
            <Upload className="w-6 h-6 text-blue-400 animate-bounce" />
          </div>
          <p className="text-blue-400 font-medium">Processing your file...</p>
        </div>
      );
    }
    
    if (uploadStatus === 'success') {
      return (
        <div className="animate-fade-in">
          <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-400" />
          <p className="text-green-400 font-medium">File uploaded successfully!</p>
        </div>
      );
    }
    
    if (uploadStatus === 'error') {
      return (
        <div className="animate-fade-in">
          <X className="w-12 h-12 mx-auto mb-4 text-red-400" />
          <p className="text-red-400 font-medium">Upload failed</p>
          {validationErrors.length > 0 && (
            <div className="mt-2 text-sm text-red-400">
              {validationErrors.map((error, index) => (
                <p key={index}>• {error}</p>
              ))}
            </div>
          )}
        </div>
      );
    }
    
    return (
      <div>
        <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        {isDragActive ? (
          <p className="text-blue-400 font-medium">Drop your file here...</p>
        ) : (
          <div>
            <p className="text-gray-300 mb-2">
              Drag and drop your sales data file here, or click to select
            </p>
            <p className="text-sm text-gray-400 mb-4">
              Supports CSV, XLS, and XLSX files (max 10MB)
            </p>
            <div className="flex gap-2 justify-center">
              <Button variant="outline" className="bg-blue-600 hover:bg-blue-700 border-blue-600 text-white">
                <Upload className="w-4 h-4 mr-2" />
                Choose File
              </Button>
              <Button 
                variant="ghost" 
                onClick={(e) => {
                  e.stopPropagation();
                  downloadSampleFile();
                }}
                className="text-gray-300 hover:text-white hover:bg-gray-700"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Sample
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 shadow-2xl">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Upload Sales Data
        </CardTitle>
        <CardDescription className="text-blue-100">
          Upload your sales data (CSV or Excel) to generate analytics dashboard
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300 ${getDropzoneStyles()}`}
        >
          <input {...getInputProps()} />
          {renderUploadContent()}
        </div>
        
        <div className="mt-6 p-4 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/30 rounded-lg shadow-sm">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-amber-200">
              <p className="font-semibold mb-2">NOTE: Required Excel/CSV Column Headers</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <p><strong>Revenue Data:</strong> "Sales Amount" OR "Amount" OR "Revenue"</p>
                <p><strong>Date Info:</strong> "Date" OR "Order Date"</p>
                <p><strong>Product Info:</strong> "Product" OR "Product Name" OR "Item"</p>
                <p><strong>Category:</strong> "Category" OR "Product Category"</p>
                <p><strong>Customer:</strong> "Customer" OR "Customer Name"</p>
                <p><strong>Location:</strong> "Region" OR "Country" OR "State"</p>
              </div>
              <p className="mt-2 text-xs italic">
                Column names are case-insensitive. At minimum, include sales amount data for analysis.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-lg shadow-sm border border-blue-500/30">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
            <div className="text-sm text-blue-200">
              <p className="font-medium mb-1">Example file structure:</p>
              <p className="font-mono text-xs bg-gray-700 p-3 rounded border shadow-inner text-gray-300">
                Date, Product, Category, Sales Amount, Customer, Region<br/>
                2024-01-15, iPhone 15, Electronics, 999, John Doe, North America
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};