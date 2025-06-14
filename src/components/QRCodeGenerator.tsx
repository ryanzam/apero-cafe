import { useEffect, useRef, useState } from 'react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Copy, Download, ExternalLink } from 'lucide-react'
import { toast } from 'sonner'

// Extend the Window type to include QRCode
declare global {
    interface Window {
        QRCode?: any;
    }
}

const QRCodeGenerator = () => {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [menuUrl, setMenuUrl] = useState('');

    useEffect(() => {
        // Generate menu URL
        const baseUrl = window.location.origin;
        const menuPageUrl = `${baseUrl}/menu`;
        setMenuUrl(menuPageUrl);

        // Generate QR code using QRCode.js library
        const generateQR = async () => {
            try {
                // Load QRCode library dynamically
                const script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/npm/qrcode@1.5.0/build/qrcode.min.js';
                script.onload = () => {
                    if (window.QRCode && canvasRef.current) {
                        window.QRCode.toCanvas(canvasRef.current, menuPageUrl, {
                            width: 256,
                            margin: 2,
                            color: {
                                dark: '#000000',
                                light: '#FFFFFF'
                            }
                        });
                    }
                };
                document.head.appendChild(script);
            } catch (error) {
                console.error('Error generating QR code:', error);
            }
        };

        generateQR();
    }, []);

    const handleDownload = () => {
        if (canvasRef.current) {
            const link = document.createElement('a');
            link.download = 'cafe-menu-qr.png';
            link.href = canvasRef.current.toDataURL();
            link.click();
            toast.success('QR code downloaded successfully!');
        }
    };

    const handleCopyUrl = () => {
        navigator.clipboard.writeText(menuUrl);
        toast.success('Menu URL copied to clipboard!');
    };

    const handleOpenMenu = () => {
        window.open('/menu', '_blank');
    };

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Digital Menu QR Code</h3>
                <p className="text-gray-600">
                    Customers can scan this QR code to access your digital menu
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* QR Code Display */}
                <Card className="flex-1">
                    <CardContent className="p-6 text-center">
                        <div className="inline-block p-4 bg-white rounded-lg shadow-sm">
                            <canvas ref={canvasRef} className="max-w-full h-auto" />
                        </div>
                    </CardContent>
                </Card>

                {/* Actions */}
                <div className="flex-1 space-y-4">
                    <Card>
                        <CardContent className="p-4 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Menu URL:
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={menuUrl}
                                        readOnly
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm"
                                    />
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handleCopyUrl}
                                    >
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Button
                                    onClick={handleDownload}
                                    className="w-full"
                                    variant="outline"
                                >
                                    <Download className="h-4 w-4 mr-2" />
                                    Download QR Code
                                </Button>

                                <Button
                                    onClick={handleOpenMenu}
                                    className="w-full bg-neutral-600 hover:bg-neutral-900"
                                >
                                    <ExternalLink className="h-4 w-4 mr-2" />
                                    Preview Menu
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4">
                            <h4 className="font-medium mb-2">How to use:</h4>
                            <ol className="text-sm text-gray-600 space-y-1">
                                <li>1. Download or display the QR code</li>
                                <li>2. Place it on tables or print it</li>
                                <li>3. Customers scan to access the menu</li>
                                <li>4. Orders appear in your dashboard</li>
                            </ol>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default QRCodeGenerator