class StatsController < ApplicationController
    
    def index
        @query = Listing.where("language = ?", params[:lang])
        @data = Array.new
        @query.each do |item|
            @data.push(item.listing)
        end
    end
    
    def language   
        #get data for each language
        @eachdata = Array.new
        @max = 0;
        Language.uniq.pluck(:language).each do |lang|
            query = Language.where("language = ?", lang)
            temp = Array.new
            query.each do |item|
                temp.push(item) 
                if(item.count > @max) 
                    @max = item.count 
                end
            end
            @eachdata.push([lang, temp])
    	end
        
        #get each language and count for that language
        @alldata = Array.new
        Language.uniq.pluck(:language).each do |lang|
            count = Language.where("language = ?", lang).sum(:count)
            @alldata.push([lang, count])
        end      
    end  
    
    def seedata
        @data = Array.new
        tempdata = Language.where("language = ?", params[:lang]) 
        tempdata.each do |item|
            @data.push(item) 
        end
    end
    
    private 
    def getdata
        Listing.uniq.pluck(:language).each do |lang| 
            
        end
    end
        
end
