import CourseCard from '@/app/learn/CourseCard';

const Page = () => {
    const courses = [
        {
            name: "cpp",
            title: "Introduction to C++",
            desc: "C++ is a high-level, general-purpose programming language created by Danish computer scientist Bjarne Stroustrup.",
            progress: 50,
            image: '/cpp.png'
        },
        {
            name: "python",
            title: "Introduction to Python",
            desc: "Python is an interpreted, high-level and general-purpose programming language.",
            image: '/python.png',
            progress: 70
        },
        {
            name: "javascript",
            title: "Introduction to JavaScript",
            desc: "JavaScript is a high-level, interpreted programming language that conforms to the ECMAScript specification.",
            image: '/javascript.png',
            progress: 30
        },
        {
            name: "java",
            title: "Introduction to Java",
            desc: "Java is a high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible.",
            image: '/java.png',
            progress: 90
        }
    ];

    return (
        <div className='bg-gray-900 py-12'>
            <div className='container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                {courses.map((course, index) => (
                    <CourseCard
                        key={index}
                        name={course.name}
                        title={course.title}
                        desc={course.desc}
                        progress={course.progress}
                        image={course.image}
                    />
                ))}
            </div>
        </div>
    );
};

export default Page;
