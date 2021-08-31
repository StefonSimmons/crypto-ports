class User < ApplicationRecord
  has_many :assets
  has_many :accounts
end
