class AssetsController < ApplicationController
  before_action :set_users_assets, only: [:index]
  before_action :set_asset, only: [:update, :destroy]

  # GET /users/:user_id/portfolios/:portfolio_id/assets
  def index
    symbols = @user_ports_assets.symbols_as_str
    allocation_currencies = @user_ports_assets.allocation_currencies_as_str

    @user_cmc_assets = cmc_assets(symbols)
    @cmc_allocation_currency_prices = allocation_currencies != "" ? cmc_assets(allocation_currencies) : nil

    render json: form_assets
  end

  # POST /assets
  def create
    new_asset = Asset.new(asset_params)
    if new_asset.save
      render json: new_asset
    end
  end

  # PUT /assets/:id
  def update
    if @asset.update(asset_params)
      render json: @asset
    end
  end

  # DELETE /assets/:id
  def destroy
    @asset.destroy
    render json: 'deleted'
  end



  # PRIVATE
  private

  # SETTERS
  def set_users_assets
    user = User.find(params[:user_id])
    @user_ports_assets = user.portfolios.find(params[:portfolio_id]).assets
  end

  def set_asset
    @asset = Asset.find(params[:id])
  end

  def asset_params
    params.require(:asset).permit(:symbol, :allocation, :quantity, :allocation_currency, :user_id, :portfolio_id)
  end

  # making http request for cmc data
  def cmc_assets(symbols)
    # store ENV in /rails-api/config/app_env_vars.rb
    api_key = ENV["cmc_api_key"]
    url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=#{symbols}&CMC_PRO_API_KEY=#{api_key}"

    response = RestClient.get(url)
    json_response = JSON.parse response.gsub("=>", ":")
    return json_response["data"]
  end

  # FORM USER'S ASSETS
  def form_assets
    @partially_formed_assets = @user_ports_assets.map { |asset| form_one_asset_1(asset) }
    formed_assets = @partially_formed_assets.map { |asset| form_one_asset_2(asset) }
    return formed_assets
  end

  # def form_asset
  #   partially_formed_asset = form_one_asset_1(@user_asset)
  #   formed_asset = form_one_asset_2(partially_formed_asset)
  #   return form_asset
  # end

  # FORM ONE ASSET pt. 1
  def form_one_asset_1(asset)
    asset_price = @user_cmc_assets[asset["symbol"]]["quote"]["USD"]["price"]
    allocation_currency_usd_price = asset["allocation_currency"] != "USD" ? @cmc_allocation_currency_prices[asset["allocation_currency"]]["quote"]["USD"]["price"] : 1
    asset_priced_in_allocation_currency = asset_price / allocation_currency_usd_price
    value = asset.quantity * asset_priced_in_allocation_currency
    value_change = value - asset.allocation
    percent_change = (value_change / asset.allocation) * 100
    percent_of_port = (asset.allocation / @user_ports_assets.sum_of_allocations(asset.allocation_currency)) * 100
    cost_basis = asset.allocation / asset.quantity

    cmc_info = {
      :allocation_currency_usd_price => allocation_currency_usd_price,
      :price => asset_priced_in_allocation_currency,
      :value => value,
      :value_change => value_change,
      :percent_change => percent_change,
      :percent_of_port => percent_of_port,
      :cost_basis => cost_basis,
    }

    asset.attributes.merge(cmc_info)
  end

  # SUM VALUES OF ALLOCATION CURRENCY
  def sum_of_values(current_asset)
    filtered_assets = @partially_formed_assets.filter { |asset| asset["allocation_currency"] == current_asset["allocation_currency"] }
    filtered_assets.sum { |asset| asset[:value] }
  end

  # FORM ONE ASSET pt. 2
  def form_one_asset_2(asset)
    percent_of_curr_port = (asset[:value] / sum_of_values(asset)) * 100
    cmc_info = { :percent_of_curr_port => percent_of_curr_port }
    asset.merge(cmc_info)
  end
end
