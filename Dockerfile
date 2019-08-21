FROM ruby:2.6 as dev
WORKDIR /app
COPY . .
RUN bundle install
EXPOSE 4567
CMD ["bundle", "exec", "middleman", "server", "--bind-address=0.0.0.0", "--watcher-force-polling", "--watcher-latency=5"]
