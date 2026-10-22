import { useEffect, useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { createARticle, getAllArticles } from "../service/article"

function Home() {

  const [articles, setArticles] = useState([])
  const [page, setPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)

  const fetchArticles = () => {
    getAllArticles(page, 10)
        .then((res) => {
          setArticles(res.data)
          setTotalPages(res.meta.totalPages)
        })
        .catch(console.error)
  }

  useEffect(() => {
    fetchArticles()
  }, [page])

  const [imageFile, setImageFile] = useState(null)

  const handleFileChange = (e: any) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0]
      if (!file.type.startsWith("image/"))
        return alert("Please select a valid image file")
      setImageFile(file)
      // const src = URL.createObjectURL(file)
    }
  }

  const submitForm = async () => {
    const formData = new FormData()
    formData.append("title", "")
    formData.append("content", "")
    if (imageFile) formData.append("image", imageFile)

    await createARticle(formData)
  }

  return (
      <div>
        <div>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>
        <div>
          <div>
            {articles.map((art: any) => (
                <div>
                  <h1>{art.title}</h1>
                  <p>{art.content}</p>
                  <img src={art.imageURL} />
                </div>
            ))}
          </div>
          <div>
            <button onClick={() => setPage(page - 1)}>{"<"}</button>
            <span>{page}</span>
            <button onClick={() => setPage(page + 1)}>{">"}</button>
          </div>
        </div>
      </div>
  )
}

export default Home
