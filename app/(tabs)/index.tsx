import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import {
  Image,
  View,
  FlatList,
  ActivityIndicator,
  Text,
} from "react-native";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";
import { getTrendingMovies } from "@/services/appwrite";
import TrendingCard from "@/components/TrendingCard";

export default function Index() {
  const router = useRouter();

  const {
    data: trendingMovies,
    loading: trendingMoviesLoading,
    error: trendingMoviesError,
  } = useFetch(getTrendingMovies);

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

  const renderContent = () => (
    <View className="px-5">
      <Image source={icons.logo} className="mx-auto mt-20 mb-5 w-12 h-10" />
      {moviesLoading || trendingMoviesLoading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          className="self-center mt-10"
        />
      ) : moviesError || trendingMoviesError ? (
        <Text>
          Error: {moviesError?.message || trendingMoviesError?.message}
        </Text>
      ) : (
        <View className="mt-5">
          <SearchBar
            onPress={() => router.push("/search")}
            placeholder="Search for a movie"
          />

          {trendingMovies && (
            <View className="mt-10">
              <Text className="mb-3 text-lg font-bold text-white">
                Trending Movies
              </Text>
              <FlatList
                className="mt-3 mb-4"
                data={trendingMovies}
                renderItem={({ item, index }) => (
                  <TrendingCard movie={item} index={index} />
                )}
                keyExtractor={(item) => item.movie_id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View className="w-4 h-2" />}
              />
            </View>
          )}

          <Text className="mt-5 mb-3 text-lg font-bold text-white">
            Latest Movies
          </Text>
          <FlatList
            data={movies}
            renderItem={({ item }) => <MovieCard {...item} />}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            columnWrapperStyle={{
              justifyContent: "flex-start",
              gap: 20,
              paddingRight: 5,
              marginBottom: 10,
            }}
            scrollEnabled={false}
          />
        </View>
      )}
    </View>
  );

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute z-0 w-full" />
      <FlatList
        data={[{ key: "content" }]} // Single item to render the full content
        renderItem={renderContent}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      />
    </View>
  );
}