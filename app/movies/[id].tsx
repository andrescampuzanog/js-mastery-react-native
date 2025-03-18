import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovieDetails } from "@/services/api";
import { icons } from "@/constants/icons";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col justify-center items-start mt-5">
    <Text className="text-sm font-normal text-light-200">{label}</Text>
    <Text className="mt-2 text-sm font-bold text-light-100">
      {value || "N/A"}
    </Text>
  </View>
);

const MovieDetails = () => {
  const { id } = useLocalSearchParams();

  const { data: movie, loading } = useFetch(() =>
    fetchMovieDetails(id as string)
  );

  return (
    <View className="flex-1 bg-primary">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            className="w-full h-[550px]"
            resizeMode="stretch"
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${movie?.poster_path}`,
            }}
          />
        </View>
        <View className="flex-col justify-center items-start px-5 mt-5">
          <Text className="text-xl font-bold text-white">{movie?.title}</Text>
          <View className="flex-row gap-x-1 items-center mt-2">
            <Text className="text-sm text-light-200">
              {movie?.release_date?.split("-")[0]}
            </Text>
            <Text className="text-sm text-light-200">{movie?.runtime}m</Text>
          </View>
          <View className="flex-row gap-x-1 items-center px-2 py-1 mt-2 rounded-md bg-dark-100">
            <Image source={icons.star} className="size-4" />
            <Text className="text-sm font-bold text-white">
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>
            <Text className="text-sm text-light-200">
              ({movie?.vote_count} votes)
            </Text>
          </View>
          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo
            label="Genres"
            value={
              movie?.genres?.map((genre) => genre.name).join(" - ") || "N/A"
            }
          />
          <View className="flex flex-row gap-x-5 justify-between w-1/2">
            <MovieInfo
              label="Budget"
              value={`$${movie?.budget ?? 0 / 1_000_000} millions`}
            />
            <MovieInfo
              label="Revenue"
              value={`$${Math.round(movie?.revenue ?? 0 / 1_000_000)} millions`}
            />
          </View>
          <MovieInfo
            label="Production Companies"
            value={
              movie?.production_companies.map((c) => c.name).join(" - ") ||
              "N/A"
            }
          />
        </View>
      </ScrollView>
      <TouchableOpacity onPress={router.back} className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50">
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor="#fff"
        />
        <Text className="text-base font-semibold text-white">Go back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;
