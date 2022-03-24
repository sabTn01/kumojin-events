FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["backend/Kumojin.Backend.Web/Kumojin.Backend.Web/Kumojin.Backend.Web.csproj", "./"]
RUN dotnet restore "Kumojin.Backend.Web.csproj"
COPY . .
WORKDIR "/src/"
RUN dotnet build "backend/Kumojin.Backend.Web/Kumojin.Backend.Web/Kumojin.Backend.Web.csproj" -c Release -o /app/build
RUN dotnet test -c Release

FROM build AS publish
RUN dotnet publish "backend/Kumojin.Backend.Web/Kumojin.Backend.Web/Kumojin.Backend.Web.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Kumojin.Backend.Web.dll"]
