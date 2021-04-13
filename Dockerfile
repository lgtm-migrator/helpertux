FROM archlinux:base-devel
RUN pacman -Syu nodejs yarn git npm --noconfirm
COPY . /opt/helpertux
WORKDIR /opt/helpertux
CMD yarn install && yarn start
