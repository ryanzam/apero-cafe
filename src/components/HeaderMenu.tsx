import { Button } from './ui/button'
import { Badge, Languages, ShoppingCart } from 'lucide-react'
import { translations } from '../utils/translations';
import type { Language } from '../pages/Menu';

interface HeaderMenuProps {
    language: Language;
    onLanguageChange: (lang: Language) => void;
    cartCount: number;
    onCartClick: () => void;
}

const HeaderMenu = ({ language, onLanguageChange, cartCount, onCartClick }: HeaderMenuProps) => {

    const tlang = translations[language]

    return (
        <header className="bg-white shadow-sm border-b sticky top-0 z-40">
            <div className="max-w-4xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">{tlang.restaurantName}</h1>
                        <p className="text-sm text-gray-600">{tlang.tagline}</p>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Language Toggle */}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onLanguageChange(language === 'en' ? 'ne' : 'en')}
                            className="flex items-center gap-2"
                        >
                            <Languages className="h-4 w-4" />
                            {language === 'en' ? 'नेपाली' : 'English'}
                        </Button>

                        {/* Cart Button */}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={onCartClick}
                            className="relative flex items-center gap-2"
                        >
                            <ShoppingCart className="h-4 w-4" />
                            {cartCount > 0 && (
                                <Badge className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                                    {cartCount}
                                </Badge>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default HeaderMenu