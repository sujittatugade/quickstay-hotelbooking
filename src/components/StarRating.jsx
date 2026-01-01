import { Star, StarBorder } from "@mui/icons-material";

function StarRating({ rating = 0 }) {
  const totalStars = 5;

  return (
    <div style={{ display: "flex", gap: 10 }}>
      {[...Array(totalStars)].map((_, ind) => {
        const starNumber = ind + 1;

        return starNumber <= rating ? (
          <Star key={ind} style={{ color: "#FFC107", fontSize: 22 }} />
        ) : (
          <StarBorder key={ind} style={{ color: "#FFC107", fontSize: 22 }} />
        );
      })}
    </div>
  );
}

export default StarRating;
