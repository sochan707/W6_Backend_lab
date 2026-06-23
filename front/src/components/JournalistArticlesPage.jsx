import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getArticlesByJournalistId } from "../services/api";

export default function JournalistArticlesPage() {
  const { id } = useParams();

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchArticles();
  }, [id]);

  const fetchArticles = async () => {
    try {
      setLoading(true);

      const data = await getArticlesByJournalistId(id);

      setArticles(data);
      setError("");
    } catch (err) {
      setError("Failed to fetch journalist articles.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading articles...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>
        {articles.length > 0
          ? `${articles[0].journalist_name}'s Articles`
          : "No Articles Found"}
      </h2>

      {articles.map((article) => (
        <div
          key={article.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>{article.title}</h3>

          <p>
            By {article.journalist_name}
          </p>

          <Link to={`/articles/${article.id}`}>
            <button>VIEW</button>
          </Link>
        </div>
      ))}
    </div>
  );
}