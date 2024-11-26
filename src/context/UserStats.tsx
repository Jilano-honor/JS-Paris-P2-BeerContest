import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

import type UserAssessmentScoreType from "../interface/UserAssessmentScoreType";
import type UserStatsType from "../interface/UserStatsType";

interface UserStatsContextType {
	userStats: UserStatsType;
	setUserStats: React.Dispatch<React.SetStateAction<UserStatsType>>;
	userAssessmentScore: UserAssessmentScoreType;
	setUserAssessmentScore: React.Dispatch<
		React.SetStateAction<UserAssessmentScoreType>
	>;
	BEER_TYPES: {
		golden: string;
		belgian: string;
		ale: string;
		ipa: string;
		hazy: string;
	};
}

const UserStats = createContext<UserStatsContextType | null>(null);

export function UserStatsProvider({ children }: { children: ReactNode }) {
	const [userStats, setUserStats] = useState<UserStatsType>({
		gamePlayed: 0,
		alcoholLevelMean: 0,
		gameLowAlcohol: 0,
		gameMiddleAlcohol: 0,
		gameHighAlcohol: 0,
	});

	const [userAssessmentScore, setUserAssessmentScore] =
		useState<UserAssessmentScoreType>({
			golden: 0,
			belgian: 0,
			ale: 0,
			ipa: 0,
			hazy: 0,
		});

	const BEER_TYPES = {
		golden: "blonde légère",
		belgian: "blonde belge",
		ale: "bière anglaise",
		ipa: "IPA",
		hazy: "IPA de caractère",
	};

	return (
		<UserStats.Provider
			value={{
				userStats,
				setUserStats,
				userAssessmentScore,
				setUserAssessmentScore,
				BEER_TYPES,
			}}
		>
			{children}
		</UserStats.Provider>
	);
}

export const useUserStats = () => {
	const value = useContext(UserStats);
	if (value == null) {
		throw new Error("useUserStats has to be used within <UserStatsProvider>");
	}

	return value;
};
