class AssetsController < ApplicationController
  #  # GET /baskets/:id
  #  def show
  #   render json: @basket.to_json(
  #     :include => {
  #       :line_items => {
  #         :include => :dish,
  #         :methods => :subtotal
  #       },
  #     },
  #     :methods => :total
  #   )
  # end

  def user_assets
    user = User.find(params[:id])
    assets = user.assets

    symbols_as_str = assets.pluck(:symbol).join(",")
    allocation_currencies_as_str = assets.where.not(allocation_currency: "USD").pluck(:allocation_currency).uniq.join(",")

    user_cmc_assets = cmc_assets(symbols_as_str)
    cmc_allocation_currency_prices = cmc_assets(allocation_currencies_as_str)

    full_assets = assets.map do |asset|
      asset_price = user_cmc_assets[asset["symbol"]]["quote"]["USD"]["price"]
      allocation_currency_usd_price = asset["allocation_currency"] != "USD" ? cmc_allocation_currency_prices[asset["allocation_currency"]]["quote"]["USD"]["price"] : 1
      value = asset.quantity * asset_price
      cmc_info = {
        :allocation_currency_usd_price => allocation_currency_usd_price,
        :price => asset_price / allocation_currency_price,
        :value => value,
        :value_change => value - asset.allocation,
      }
      asset.attributes.merge(cmc_info)
    end

    render json: full_assets

    # render json: assets.to_json(methods: [:allocation_currency_price, :cmc_asset])
  end

  # making http request
  def cmc_assets(symbols)
    api_key = ENV["cmc_api_key"]
    url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=#{symbols}&CMC_PRO_API_KEY=#{api_key}"

    response = RestClient.get(url)
    json_response = JSON.parse response.gsub("=>", ":")
    return json_response["data"]
  end
end
