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
	BEER_CATEGORIES: {
		golden: string;
		belgian: string;
		ale: string;
		ipa: string;
		hazy: string;
	};
	sortedType: [string, number][];
	userMaxKey: "golden" | "belgian" | "ale" | "ipa" | "hazy";
	maxValue: number;
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

	const BEER_CATEGORIES = {
		golden: "bière blonde légère",
		belgian: "bière blonde belge",
		ale: "bière anglaise",
		ipa: "IPA",
		hazy: "IPA de caractère",
	};

	const maxValue = Math.max(...Object.values(userAssessmentScore));
	const userMaxKey = Object.keys(userAssessmentScore).find(
		(key) =>
			userAssessmentScore[key as keyof typeof userAssessmentScore] === maxValue,
	) as keyof typeof BEER_CATEGORIES;

	const sortedType = Object.entries(userAssessmentScore).sort(
		([, A], [, B]) => B - A,
	);

	return (
		<UserStats.Provider
			value={{
				userStats,
				setUserStats,
				userAssessmentScore,
				setUserAssessmentScore,
				BEER_CATEGORIES,
				sortedType,
				userMaxKey,
				maxValue,
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
