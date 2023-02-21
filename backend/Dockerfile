# https://hub.docker.com/_/microsoft-dotnet
FROM mcr.microsoft.com/dotnet/sdk:7.0-jammy AS build
WORKDIR /source

# copy csproj and restore as distinct layers
COPY *.csproj .
RUN dotnet restore -r linux-x64

# copy everything else and build app
COPY . .
#RUN dotnet publish -c Release -o /app -r linux-x64 --self-contained false --no-restore
RUN dotnet publish -r linux-x64 --verbosity normal -c Release -o /app

# final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:7.0-jammy-amd64
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "/app/moviedb.dll"]
