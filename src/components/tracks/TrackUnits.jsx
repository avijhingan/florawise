import { ArrowLeft } from "lucide-react";
import React from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";

import { BOTANY_TRACK } from "@/data/tracks/botany";
import { generatePath } from "@/helpers/navigation";
import { cn } from "@/lib/utils";

const TrackUnits = () => {
  const { trackId } = useParams();
  const navigate = useNavigate();

  const track = BOTANY_TRACK;

  const handleUnitClick = (unitId) => {
    navigate(generatePath.unitLessons(trackId, unitId));
  };

  const handleBack = () => {
    navigate("/tracks");
  };

  if (!track) {
    return <Navigate to="/tracks" replace />;
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-lg">
      {/* Header with back navigation and track info */}
      <div className="mb-6">
        <button
          onClick={handleBack}
          className="mb-4 p-2 hover:bg-gray-100 rounded-lg transition-colors inline-flex items-center"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-2xl font-bold mb-2">{track.title}</h1>
        <p className="text-gray-600">{track.description}</p>
      </div>

      {/* Grid of unit cards */}
      <div className="space-y-4">
        {track.units.map((unit) => (
          <div
            key={unit.id}
            onClick={() => handleUnitClick(unit.id)}
            className={cn(
              "bg-white rounded-lg p-4 cursor-pointer",
              "border border-gray-200 shadow-sm",
              "hover:shadow-md transition-shadow",
            )}
          >
            <div className="aspect-[3/1] mb-3 relative rounded-lg overflow-hidden bg-gray-100">
              <img
                src={`/images/units/${unit.id}.jpg`}
                alt=""
                className="object-cover w-full h-full"
              />
            </div>
            <h2 className="text-lg font-semibold mb-1">{unit.title}</h2>
            <p className="text-sm text-gray-600">{unit.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackUnits;
