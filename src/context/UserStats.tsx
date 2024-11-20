import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface MyContextProps {
	children: ReactNode;
}

interface UserStatsType {
	gamePlayed: number;
	alcoholLevelMean: number;
	gameLowAlcohol: number;
	gameMiddleAlcohol: number;
	gameHighAlcohol: number;
}

interface UserStatsContextType {
	userStats: UserStatsType;
	setUserStats: React.Dispatch<React.SetStateAction<UserStatsType>>;
}

const UserStats = createContext<UserStatsContextType | null>(null);

export function UserStatsProvider({ children }: MyContextProps) {
	const [userStats, setUserStats] = useState<UserStatsType>({
		gamePlayed: 0,
		alcoholLevelMean: 0,
		gameLowAlcohol: 0,
		gameMiddleAlcohol: 0,
		gameHighAlcohol: 0,
	});

	return (
		<UserStats.Provider value={{ userStats, setUserStats }}>
			{children}
		</UserStats.Provider>
	);
}

export const useUserStats = () => {
	const value = useContext(UserStats);
	if (value == null) {
		throw new Error("useTheme has to be used within <ThemeProvider>");
	}

	return value;
};
