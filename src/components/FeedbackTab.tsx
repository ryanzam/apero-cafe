import { Button } from './ui/button'
import { Clock, Star } from 'lucide-react'
import { Card, CardContent } from './ui/card'

interface FeedbackTabProps {
    feedbacks: any[];
    onRefresh: () => void;
}

const FeedbackTab = ({ feedbacks, onRefresh }: FeedbackTabProps) => {

    const formatTime = (timestamp: string) => {
        return new Date(timestamp).toLocaleString();
    };

    const renderStars = (rating: number) => {
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`h-4 w-4 ${star <= rating
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300'
                            }`}
                    />
                ))}
            </div>
        );
    };

    const getAverageRating = () => {
        if (feedbacks.length === 0) return 0;
        const sum = feedbacks.reduce((acc, fb) => acc + fb.rating, 0);
        return Math.round((sum / feedbacks.length) * 10) / 10;
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Customer Feedback</h2>
                <Button onClick={onRefresh} variant="outline">
                    Refresh
                </Button>
            </div>

            {feedbacks.length > 0 && (
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-yellow-600">{getAverageRating()}</div>
                                <div className="text-sm text-gray-600">Average Rating</div>
                            </div>
                            <div className="flex items-center gap-2">
                                {renderStars(Math.round(getAverageRating()))}
                                <span className="text-sm text-gray-600">({feedbacks.length} reviews)</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {feedbacks.length === 0 ? (
                <Card>
                    <CardContent className="p-8 text-center">
                        <p className="text-gray-500">No feedback yet. Customer reviews will appear here.</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4">
                    {feedbacks.map((feedback) => (
                        <Card key={feedback.id}>
                            <CardContent className="p-6">
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            {renderStars(feedback.rating)}
                                            <span className="font-medium">{feedback.rating}/5</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-sm text-gray-600">
                                            <Clock className="h-4 w-4" />
                                            {formatTime(feedback.created_at)}
                                        </div>
                                    </div>

                                    {feedback.comment && (
                                        <div>
                                            <p className="text-gray-700">{feedback.comment}</p>
                                        </div>
                                    )}

                                    <div className="text-sm text-gray-500">
                                        Order: {feedback.feedback_id}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}

export default FeedbackTab