class User < ApplicationRecord
  has_many :assets, dependent: :destroy
  has_many :accounts, dependent: :destroy
  has_many :portfolios, dependent: :destroy
  
  has_secure_password
end
