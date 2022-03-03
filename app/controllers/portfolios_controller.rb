class PortfoliosController < ApplicationController
  before_action :set_portfolio, only: [:update, :destroy]
  before_action :authorize_request, only: [:index]

  # GET /users/:user_id/portfolios
  def index
    user = User.find(params[:user_id])
    user_portfolios = user.portfolios
    render json: user_portfolios.to_json(:methods => :total_allocation)
  end

  # POST /portfolios
  def create 
    portfolio = Portfolio.new(portfolio_params)
    if portfolio.save
      render json: portfolio
    else
      render json: portfolio.errors, status: :unprocessable_entity
    end
  end

  # PUT /portfolios/:id
  def update 
    if @portfolio.update(portfolio_params)
      render json: @portfolio
    else
      render json: @portfolio.errors, status: :unprocessable_entity
    end
  end

  # DELETE /portfolios/:id
  def destroy
    @portfolio.destroy
    render json: 'deleted'
  end

  private
  def portfolio_params
    params.require(:portfolio).permit(:name, :alias, :user_id)
  end

  def set_portfolio
    @portfolio = Portfolio.find(params[:id])
  end
end
