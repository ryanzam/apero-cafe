import { useState } from 'react'
import { translations } from '../utils/translations';
import type { Language } from '../pages/Menu';
import { toast } from 'sonner';
import { Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { saveFeedback } from '../utils/supabase';
//import { saveFeedback } from '../utils/data';

interface FeedbackFormProps {
    orderId: string | null;
    language: Language;
    onComplete: () => void;
    onSkip: () => void;
}

const FeedbackForm = ({ orderId, language, onComplete, onSkip }: FeedbackFormProps) => {

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const tlang = translations[language];

    const handleSubmit = async () => {
        if (rating === 0) {
            toast.error(tlang.selectRating);
            return;
        }

        const feedback = {
            id: `FB-${Date.now()}`,
            orderId,
            rating,
            comment,
            timestamp: new Date().toISOString()
        };

        try {
            await saveFeedback(feedback);

            console.log(`Feedback received for Order ${orderId}:`);
            console.log(`Rating: ${rating}/5 stars`);
            console.log(`Comment: ${comment || 'No comment'}`);

            onComplete();
        } catch (error) {
            toast.error("Failed to submit feedback. Please try again.");
            console.error(error);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-center">{tlang.feedback}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="text-center">
                        <p className="text-gray-600 mb-4">{tlang.rateExperience}</p>

                        {/* Star Rating */}
                        <div className="flex justify-center gap-2 mb-4">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onClick={() => setRating(star)}
                                    className="transition-colors"
                                >
                                    <Star
                                        className={`h-8 w-8 ${star <= rating
                                            ? 'text-yellow-400 fill-yellow-400'
                                            : 'text-gray-300'
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>

                        {rating > 0 && (
                            <p className="text-sm text-gray-600 mb-4">
                                {rating === 5 ? tlang.excellent :
                                    rating === 4 ? tlang.good :
                                        rating === 3 ? tlang.average :
                                            rating === 2 ? tlang.poor : tlang.terrible}
                            </p>
                        )}
                    </div>

                    {/* Comment */}
                    <div>
                        <Textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder={tlang.feedbackComment}
                            className="min-h-[80px]"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            onClick={onSkip}
                            className="flex-1"
                        >
                            {tlang.skip}
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            className="flex-1 bg-orange-600 hover:bg-orange-700"
                        >
                            {tlang.submit}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default FeedbackForm