# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)



stefon = User.create!(username: 'sound', email: 'sound@me.me', password:'123456')

pp "Created #{User.count} user(s)"

accounts = Account.create!([
  {
    name: 'ira',
    amount: 30000,
    user: stefon
  },
  {
    name: 'hodl',
    amount: 20000,
    user: stefon
  },
  {
    name: 'emergency',
    amount: 16000,
    user: stefon
  }
])

pp "Created #{Account.count} account(s)"


portfolios = Portfolio.create!([
  {
    name: 'BTC',
    alias: 'Trade-BTC',
    user: stefon
  },
  {
    name: 'USD',
    alias: 'Hold-USD',
    user: stefon
  }
])

pp "Created #{Portfolio.count} portfolio(s)"

assets= Asset.create!([
  {
    symbol: 'XRP',
    allocation: 494,
    quantity: 1011,
    allocation_currency: 'USD',
    user: stefon,
    portfolio: portfolios.second
  },
  {
    symbol: 'BTC',
    allocation: 2610,
    quantity: 0.25,
    allocation_currency: 'USD',
    user: stefon,
    portfolio: portfolios.second
  },
  {
    symbol: 'ADA',
    allocation: 50,
    quantity: 677,
    allocation_currency: 'USD',
    user: stefon,
    portfolio: portfolios.second
  },
  {
    symbol: 'ETH',
    allocation: 0.021,
    quantity: 0.31,
    allocation_currency: 'BTC',
    user: stefon,
    portfolio: portfolios.first
  },
  {
    symbol: 'SOL',
    allocation: 0.00145,
    quantity: 0.725,
    allocation_currency: 'BTC',
    user: stefon,
    portfolio: portfolios.first
  },
  {
    symbol: 'ADA',
    allocation: 0.00145,
    quantity: 30.34,
    allocation_currency: 'BTC',
    user: stefon,
    portfolio: portfolios.first
  }
])
pp "Created #{Asset.count} asset(s)"
