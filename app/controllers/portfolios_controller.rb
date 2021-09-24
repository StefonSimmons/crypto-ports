class PortfoliosController < ApplicationController
  
  # GET /users/:user_id/portfolios
  def index
    user = User.find(params[:user_id])
    render json: user.portfolios
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
    portfolio = Portfolio.find(params[:id])
    if portfolio.update(portfolio_params)
      render json: portfolio
    else
      render json: portfolio.errors, status: :unprocessable_entity
    end
  end


  private
  def portfolio_params
    params.require(:portfolio).permit(:name, :alias, :user_id)
  end
end
