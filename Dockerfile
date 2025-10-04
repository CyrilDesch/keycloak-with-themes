# Stage 1: Build all Keycloakify themes
FROM node:20-alpine AS theme-builder

WORKDIR /app

COPY keycloakify-theme-*/ ./
COPY build-all-themes.sh ./

RUN chmod +x build-all-themes.sh
RUN ./build-all-themes.sh

# Stage 2: Build Keycloak with custom themes
FROM quay.io/keycloak/keycloak:latest AS builder

ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true

WORKDIR /opt/keycloak

COPY --from=theme-builder --chown=keycloak:keycloak --chmod=644 /app/built-themes/*.jar /opt/keycloak/providers/
RUN touch -m --date=@1743465600 /opt/keycloak/providers/*

RUN /opt/keycloak/bin/kc.sh build

# Stage 3: Final runtime image
FROM quay.io/keycloak/keycloak:latest

COPY --from=builder /opt/keycloak/ /opt/keycloak/

WORKDIR /opt/keycloak

# Set the entrypoint
ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]

