import { Appbar } from "../components/Appbar";
import { useBlogs } from "../hooks";
import { Blogcomponent } from "../components/Blogcomponent";
import { BlogSkeleton } from "../components/Blogskleton";


export const Blog = () => {
    const { loading, blogs } = useBlogs();
    if (loading) {
        return (
            <div>
                <div>
                    <Appbar/>
                </div>
                <div className="flex justify-center flex-col items-center">
                <div className="md:w-6/12 p-5">
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>

                </div>
            </div>
            </div>
        );
    }
    return (
        <div>
            <Appbar></Appbar>
            <div className="flex justify-center flex-col items-center">
                <div className="md:w-6/12 p-5">
                    {blogs.map((val) => (
                        <div key={val.id}>
                            <Blogcomponent 
                                Authorname={val.author.username} 
                                title={val.title} 
                                content={val.content} 
                                publisedDate="19-08-2024"
                                id={val.id}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
