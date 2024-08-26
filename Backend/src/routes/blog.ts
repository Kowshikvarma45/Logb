import { Hono } from "hono";
import { AuthMiddleware } from "../authentication";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { editValidation, postValidation, readValidation } from "@kvarma/medium-common";

export const blogRouter = new Hono<{
    Bindings:{
        DATABASE_URL:string;
        JWT_SECRET:string;
    }
    Varibles:{
        userID:String
    }
}>();

type postschema =  {
    title:string,
    content:string,
    authorId:string
}



blogRouter.post('/post',AuthMiddleware,async(c)=>{
    // @ts-ignore
    const userID = c.get('userID') as string | "";
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const createPayload = await c.req.json()
    const parsedPayload = postValidation.safeParse(createPayload)
    if(!parsedPayload.success) {
        c.status(403)
        return c.json({
            msg:"sorry something up with given inputs"
        })
    }
    else {
        try {
            const response = await prisma.post.create({
                data:{
                    title:parsedPayload.data.title,
                    content:parsedPayload.data.content,
                    authorId:userID
                } as postschema
            })
            if(response) {
                const updated = await prisma.post.update({
                    where:{
                        id:response.id
                    },
                    data:{
                        published:true
                    }
                })
                if(updated) {
                    return c.json({
                        msg:"post uploaded successfully",
                        id:response.id
                    })
                }
            }
            else {
                c.status(403)
                return c.json({
                    msg:"post not created due to internal error"
                })
            }
        }catch(e) {
            c.status(403)
            return c.json({
                msg:"invalid user",
            })
        }
    }

})
blogRouter.put('/edit',AuthMiddleware,async(c)=>{
    // @ts-ignore
    const userID = c.get('userID') as string | undefined
    const createpayload = await c.req.json()
    const parsedpayload = editValidation.safeParse(createpayload)
    if(!parsedpayload.success) {
        c.status(403)
        return c.json({
            msg:"invalid inputs"
        })
    }
    else {
        try {
            const prisma  =  new PrismaClient({
                datasourceUrl:c.env.DATABASE_URL,
            }).$extends(withAccelerate())
            const response = await prisma.post.update({
                where:{
                    id:parsedpayload.data.id,
                    authorId:userID
                },
                data:{
                    title:parsedpayload.data.title,
                    content:parsedpayload.data.content
                }
            })
            if(response) {
                c.status(200)
            return c.json({
                msg:"post succesfully updated",
                response:response
            })
            }
            else {
                c.status(403)
                return c.json({
                    msg:"post not found"
                })
            }
        }catch(err) {
            c.status(403)
            return c.json({
                msg:"please check the internet connection"
            })
        }
    }

})
//userposts!!
blogRouter.get('/myposts',AuthMiddleware,async(c)=>{
    // @ts-ignore
    const id = c.get('userID') as string 
    if(!id) {
        c.status(204)
        return c.json({
            msg:"id mapping failed"
        })
    }
    else {
        try{
            const prisma = new PrismaClient({
                datasourceUrl:c.env.DATABASE_URL
            }).$extends(withAccelerate())
            const response = await prisma.user.findUnique({
                where:{
                    id:id
                },
                select:{
                    posts:{
                        select:{
                            id:true,
                            title:true,
                            content: true,
                            author: {
                                select:{
                                    username:true
                                }
                            }
                        }
                    },
                    username:true,
                    email:true,
                    password:true
                }
            })
            if(response) {
                c.status(200)
                return c.json({
                    msg:"posts successfully loaded",
                    response:response
                })
            }
            else {
                c.status(204)
                return c.json({
                    msg:"no posts yet"
                })
            }
        }catch(err) {
            c.status(204)
            return c.json({
                msg:"some Internal error occured while fetching posts"
            })
        }
    }
    
})

blogRouter.get('/:id',async(c)=>{
    const createpayload = c.req.param("id")
    if(!createpayload) {
        c.status(403)
        return c.json({
            msg:"invalid inputs"
        })
    }
    else {
        try {
            const prisma = new PrismaClient({
                datasourceUrl:c.env.DATABASE_URL
            }).$extends(withAccelerate())

            const response = await prisma.post.findUnique({
                where:{
                    id:createpayload
                },
                select:{
                    id: true,
                    title: true,
                    content: true,
                    author: {
                        select: {
                            username: true
                        }
                    }
                }
            })

            if(response) {
                c.status(200)
                return c.json({
                    msg:"this is the article",
                    response:response
                })
            }
            else {
                c.status(403)
                return c.json({
                    msg:"check the internet connection"
                })
            }
        }catch(err) {
            c.status(403)
            return c.json({
                msg:"some error ocurred while fetching the blog"
            })
        }
    }
})

blogRouter.post('/bulk',async(c)=>{
    try {
        const prisma = new PrismaClient({
            datasourceUrl:c.env.DATABASE_URL
        }).$extends(withAccelerate())
        const response = await prisma.post.findMany({
            select:{
                id:true,
                title:true,
                content:true,
                author:{
                    select:{
                        username:true
                    }
                }
            }
        })
        if(response) {
            c.status(200)
            return c.json(response)
        }
        else {
            c.status(403)
            return c.json({
                msg:"no data found!"
            })
        }
    }catch(err) {
        c.status(403)
        return c.json({
            msg:"network issues while generating the prismaclient"
        })
    }

})

blogRouter.put('/delete',AuthMiddleware,async(c)=>{
    // @ts-ignore
    const userID = c.get('userID') as string | undefined
    const createpayload = await c.req.json()
    const parsedpayload = readValidation.safeParse(createpayload)
    if(!parsedpayload.success) {
        c.status(403)
        return c.json({
            msg:"invalid inputs"
        })
    }
    else {
        try {
            const prisma  =  new PrismaClient({
                datasourceUrl:c.env.DATABASE_URL,
            }).$extends(withAccelerate())
            const response =await prisma.post.delete({
                where:{
                    id:parsedpayload.data.id,
                    authorId:userID
                }
            })
            if(response) {
                c.status(200)
            return c.json({
                msg:"post succesfully deleted",
                response:response
            })
            }
            else {
                c.status(403)
                return c.json({
                    msg:"post not found"
                })
            }
        }catch(err) {
            c.status(403)
            return c.json({
                msg:"please check the internet connection"
            })
        }
    }

})







