import { useState, useEffect } from "react";
import { saveFavorite } from "../services/favoriteService";

export default function Results({ user, shows }) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [selectedScore, setSelectedScore] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    setSelectedScore("");
    setDropdownVisible(false);
    setSaved(false);
    setSaving(false);
  }, [shows]);

  async function save() {
    try {
      setSaving(true);
      await saveFavorite(shows.showId, parseInt(selectedScore));
      setSaved(true);
    
    } finally {
      setSaving(false);
    }
  }

  function handleDropdownChange(event) {
    setSelectedScore(event.target.value);
  }

  if (!shows) {
    return null;
  }

  function ButtonScore() {
    return (
      dropdownVisible && (
        
        <div>
          <select value={selectedScore} onChange={handleDropdownChange}>
            <option value="" disabled>
              Select a score
            </option>
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>

          <button onClick={save} disabled={saving || !selectedScore}>
            {saving ? "Saving..." : "Save"}
          </button>

          {saved && <p>{shows.summary}</p>}
        </div>
      )
    );
  }

  return (
    <div>
        <h2>{shows.name}</h2>

        {shows.image ? (
            <img src={shows.image} alt={shows.name} />
        ) : (
            <p>No image available</p>
        )}
        <div>
            {user ? (
                <div>
                    <button onClick={() => setDropdownVisible((prev) => !prev)}>
                        {dropdownVisible ? "Hide Options" : "Rate this Show"}
                    </button>
                    {<ButtonScore />}
                </div>

            ) : (
                <h3>Please Log In to rate your show.</h3>
            )}

        </div>  
      

    </div>
  );
}
