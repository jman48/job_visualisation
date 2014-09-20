class Listing < ActiveRecord::Base
    serialize :listing, JSON
end
