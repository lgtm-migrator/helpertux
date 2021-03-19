FROM archlinux:latest
RUN pacman -Syu nodejs yarn zsh
ADD . /opt/helpertux
WORKDIR /opt/helpertux
RUN useradd -D mrtux
USER mrtux
CMD yarn start
