import express from 'express'
import cors from 'cors'
import { PrismaClient } from '.prisma/client'

const app = express()
app.use(cors())
app.use(express.json())

const prisma = new PrismaClient()

const port = 3456

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany({include: {posts: true}})
  res.json(users)
})

app.get('/users/:id', async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: Number(req.params.id) },
    include: {posts: true},
  })
  if (user) {
    res.json(user)
  } else {
    res.status(404).json({ error: 'User not found' })
  }
})


app.post('/users', async (req, res) => {
  const user = await prisma.user.create({
    data: req.body,
    include: {posts: true},
  })
  res.json(user)
})

app.put('/users/:id', async (req, res) => {
  const user = await prisma.user.update({
    where: { id: Number(req.params.id) },
    data: req.body,
    include: {posts: true},
  })
  res.json(user)
})

app.delete('/users/:id', async (req, res) => {
  const user = await prisma.user.delete({
    where: { id: Number(req.params.id) },
    include: {posts: true},
  })
  res.json(user)
})



app.get ('/posts', async (req, res) => {
  const posts = await prisma.post.findMany()
  res.json(posts)
})

app.get('/posts/:id', async (req, res) => {
  const post = await prisma.post.findUnique({
    where: { id: Number(req.params.id) },
  })
  if (post) {
    res.json(post)
  } else {
    res.status(404).json({ error: 'Post not found' })
  }
})

app.post('/posts', async (req, res) => {
  const post = await prisma.post.create({
    data: req.body,
  })
  res.json(post)
})


app.put('/posts/:id', async (req, res) => {
  const post = await prisma.post.update({
    where: { id: Number(req.params.id) },
    data: req.body,
  })
  res.json(post)
})

app.delete('/posts/:id', async (req, res) => {
  const post = await prisma.post.delete({
    where: { id: Number(req.params.id) },
  })
  res.json(post)
})

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`)
})
