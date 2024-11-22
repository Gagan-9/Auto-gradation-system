'use client';
import { Button, Card, CardBody, CardTitle, CardText, Progress } from 'reactstrap';
import { useRouter } from 'next/navigation';

const CourseCard = ({ name, title, desc, progress, image }) => {
    const router = useRouter();

    return (
        <Card className='bg-gray-800 p-4 rounded-xl w-[350px] shadow-lg cursor-pointer transition-transform transform hover:scale-105 hover:bg-gray-700'>
            <CardBody className='flex flex-col p-4 gap-4 h-full'>
                <div className='flex justify-center mb-4'>
                    <img
                        src={image}
                        alt={title}
                        className='w-32 h-32 object-contain rounded-md'
                    />
                </div>
                <CardTitle 
                    tag="h3"
                    className='text-white text-lg font-semibold mb-2 text-center'
                >
                    {title}
                </CardTitle>
                <CardText
                    className='text-gray-400 text-sm flex-grow text-justify'
                >
                    {desc}
                </CardText>
                <Progress color='success' value={progress} className='my-2' />
                <Button
                    color='primary'
                    className='w-full mt-4'
                    onClick={() => router.push(`/courses/${name}`)}
                >
                    Explore Course
                </Button>
            </CardBody>
        </Card>
    );
};

export default CourseCard;
