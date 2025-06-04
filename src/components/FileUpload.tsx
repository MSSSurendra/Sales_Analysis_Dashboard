
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, AlertCircle, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { processSalesData } from "@/utils/dataProcessor";
import { useSalesData } from "@/contexts/SalesDataContext";

export const FileUpload = () => {
  const { toast } = useToast();
  const { setSalesData, setIsUsingUploadedData } = useSalesData();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    try {
      const processedData = await processSalesData(file);
      setSalesData(processedData);
      setIsUsingUploadedData(true);
      
      toast({
        title: "File uploaded successfully!",
        description: `Processed ${file.name} and generated analytics.`,
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Please check your file format and try again.",
        variant: "destructive",
      });
      console.error('File processing error:', error);
    }
  }, [setSalesData, setIsUsingUploadedData, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls']
    },
    maxFiles: 1
  });

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Upload Sales Data
        </CardTitle>
        <CardDescription>
          Upload your sales data (CSV or Excel) to generate analytics dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <input {...getInputProps()} />
          <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          {isDragActive ? (
            <p className="text-blue-600 font-medium">Drop your file here...</p>
          ) : (
            <div>
              <p className="text-gray-600 mb-2">
                Drag and drop your sales data file here, or click to select
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Supports CSV, XLS, and XLSX files
              </p>
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Choose File
              </Button>
            </div>
          )}
        </div>
        
        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-amber-800">
              <p className="font-semibold mb-2">NOTE: Required Excel/CSV Column Headers</p>
              <div className="space-y-2">
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
        
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Example file structure:</p>
              <p className="font-mono text-xs bg-white p-2 rounded border">
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
