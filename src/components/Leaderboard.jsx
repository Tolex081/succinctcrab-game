import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import './Leaderboard.css';

const Leaderboard = ({ leaderboard, error }) => {
  const sortedLeaderboard = useMemo(() => {
    return [...leaderboard].sort((a, b) => b.score - a.score || b.level - a.level);
  }, [leaderboard]);

  return (
    <div className="leaderboard-container" aria-label="Leaderboard rankings">
      <h3>🏆 Leaderboard</h3>
      {error ? (
        <p className="error">{error}</p>
      ) : sortedLeaderboard.length > 0 ? (
        <ol className="leaderboard-list">
          {sortedLeaderboard.map((entry, index) => {
            const avatar =
              index === 0 ? '🐋' :
              index === 1 ? '🦈' :
              index === 2 ? '🐬' : '🦀';

            const avatarStyle = {
              fontSize: index === 0 ? '32px' :
                         index === 1 ? '26px' :
                         index === 2 ? '22px' : '18px',
              marginRight: '8px'
            };

            const badge =
              index === 0 ? <span className="badge gold" aria-label="Gold badge">🏆</span> :
              index === 1 ? <span className="badge silver" aria-label="Silver badge">🥈</span> :
              index === 2 ? <span className="badge bronze" aria-label="Bronze badge">🥉</span> :
              <span className="position" aria-label={`Position ${index + 1}`}>{index + 1}</span>;

            return (
              <li key={entry._id || `${entry.username}-${entry.timestamp}`} className="leaderboard-entry">
                <div className="user-info">
                  <span style={avatarStyle}>{avatar}</span>
                  {badge}
                  <span className="username">{entry.username.replace(/^@/, '')}</span>
                </div>
                <span className="score">Score: {entry.score}</span>
                <span className="level">Level: {entry.level}</span>
                {entry.explorer_url && (
                  <a href={entry.explorer_url} target="_blank" rel="noopener noreferrer" className="explorer-link">
                    View Proof
                  </a>
                )}
              </li>
            );
          })}
        </ol>
      ) : (
        <p>No scores yet!</p>
      )}
    </div>
  );
};

Leaderboard.propTypes = {
  leaderboard: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
      level: PropTypes.number.isRequired,
      timestamp: PropTypes.number,
      explorer_url: PropTypes.string,
    })
  ).isRequired,
  error: PropTypes.string,
};

export default Leaderboard;
